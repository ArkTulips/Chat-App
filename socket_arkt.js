const { io } = require("socket.io-client");

// Arkt's JWT
const YOUR_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhkMGZjYWJkLTZmN2YtNDQ5OS1hYmZlLWU1MWNiOGZmNDVlOSIsImlhdCI6MTc2ODc0NDI1NywiZXhwIjoxNzY4NzQ3ODU3fQ.OQd3HkfqQ0tf6CgMtoblP1gBKy1V3aQ_IO-UR56zh7w";

// SP's user ID (recipient)
const RECIPIENT_USER_ID = "9170fa4d-33e3-49db-a16f-d9c8062cdc78"; // replace with sp's actual user id

const socket = io("http://localhost:5001", {
  auth: { token: YOUR_JWT },
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("Arkt connected as:", socket.id);

  // Example message
  socket.emit("send_message", {
    to: RECIPIENT_USER_ID,
    message: "Hey SP! This is Arkt "
  });
});

socket.on("receive_message", (data) => {
  console.log("Arkt received:", data);
});
