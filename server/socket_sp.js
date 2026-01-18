const { io } = require("socket.io-client");

// SP's JWT
const YOUR_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxNzBmYTRkLTMzZTMtNDlkYi1hMTZmLWQ5YzgwNjJjZGM3OCIsImlhdCI6MTc2ODU4MjI5OCwiZXhwIjoxNzY4NTg1ODk4fQ.hFo7ofztDwTXAOX_EpyaJD8_lMENPlykcN_KVs373do";

// Arkt's user ID (recipient)
const RECIPIENT_USER_ID = "6fc4098f-58e0-4b2f-8494-c932d968b32a"; // replace with arkt's actual user id

const socket = io("http://localhost:5001", {
  auth: { token: YOUR_JWT },
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("SP connected as:", socket.id);

  // Example message
  socket.emit("send_message", {
    to: RECIPIENT_USER_ID,
    message: "Hi Arkt! This is SP "
  });
});

socket.on("receive_message", (data) => {
  console.log("SP received:", data);
});
