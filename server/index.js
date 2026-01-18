const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const messageRoutes = require("./routes/messages");


dotenv.config();

const authRoutes = require("./routes/auth");
const pool = require("./db");

const app = express();
const server = http.createServer(app);

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* ---------- SOCKET.IO ---------- */
const io = new Server(server, {
  cors: { origin: "*" }
});

/* ---------- SOCKET AUTH ---------- */
io.use((socket, next) => {
  const token =
    socket.handshake.auth?.token ||
    socket.handshake.query?.token;

  if (!token) return next(new Error("No token"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // { id }
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

/* ---------- SOCKET EVENTS ---------- */
io.on("connection", (socket) => {
  console.log("User connected:", socket.user.id);

  // join personal room
  socket.join(socket.user.id);

  socket.on("send_message", async ({ to, message }) => {
    try {
      const result = await pool.query(
        `INSERT INTO messages (sender_id, receiver_id, content)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [socket.user.id, to, message]
      );

      const msg = result.rows[0];

      // send to receiver
      io.to(to).emit("receive_message", {
        from: msg.sender_id,
        message: msg.content,
        timestamp: msg.created_at
      });

      // confirm to sender
      socket.emit("message_sent", {
        to,
        message: msg.content
      });

    } catch (err) {
      console.error("Message error:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.user.id);
  });
});

/* ---------- START ---------- */
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
});
