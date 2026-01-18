const { io } = require("socket.io-client");
const readline = require("readline");

// -------------------- CONFIG --------------------
// Replace these with your user JWT and recipient's user ID
const YOUR_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhkMGZjYWJkLTZmN2YtNDQ5OS1hYmZlLWU1MWNiOGZmNDVlOSIsImlhdCI6MTc2ODc0NDMxOSwiZXhwIjoxNzY4NzQ3OTE5fQ.Txp2o1VbISaboy9xkVH4Yfb6QL72hKbICATdpvG7CXM";
const RECIPIENT_USER_ID = "fb95920e-5434-42b6-acf7-9d9620f8bd2f";
// ------------------------------------------------

const socket = io("http://localhost:5001", {
  auth: { token: YOUR_JWT },
  transports: ["websocket"]
});

// Setup console input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Connected
socket.on("connect", () => {
  console.log(`Connected as socket ID: ${socket.id}`);
  console.log("Type your messages and press Enter to send:\n");
});

// Receive messages
socket.on("receive_message", (data) => {
  console.log(`\n Message from ${data.from}: ${data.message}`);
  rl.prompt(true);
});

// Handle connection errors
socket.on("connect_error", (err) => {
  console.error("Connection error:", err.message);
});

// Read messages from console and send
rl.on("line", (input) => {
  if (!input.trim()) return;
  socket.emit("send_message", {
    to: RECIPIENT_USER_ID,
    message: input
  });
  rl.prompt(true);
});
