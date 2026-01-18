🗨️ Real-Time Chat Application (Task 2)

A real-time chat backend built with Node.js, Express, Socket.IO, JWT authentication, and PostgreSQL.
This project demonstrates secure user authentication, real-time messaging, and message persistence.

🚀 Features

🔐 JWT-based Authentication

🔄 Real-time messaging using Socket.IO

👤 User-specific chat rooms

💾 Message history stored in PostgreSQL

🧪 CLI-based socket clients for testing

🌐 CORS-enabled API

🛠 Tech Stack

Backend: Node.js, Express

Real-time: Socket.IO

Database: PostgreSQL

Auth: JWT (JSON Web Tokens)

Testing: Node CLI clients

Environment: dotenv

📁 Project Structure
task-2/
│
├── server/
│   ├── index.js              # Main server entry
│   ├── db.js                 # PostgreSQL connection
│   ├── routes/
│   │   ├── auth.js            # Auth routes (login/register)
│   │   └── messages.js        # Fetch chat history
│   ├── socket_arkt.js         # Chat client (User A)
│   ├── socket_sp.js           # Chat client (User B)
│   ├── .env                   # Environment variables (ignored)
│   └── .gitignore
│
└── README.md

🔑 Environment Variables

Create a .env file inside server/:

PORT=5001
JWT_SECRET=your_secret_key
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=chat_app


⚠️ .env is ignored using .gitignore and should never be committed.

🗄 Database Schema
Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

Messages Table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID,
  receiver_id UUID,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

▶️ Running the Server
cd server
npm install
npx nodemon index.js


Server runs on:

http://localhost:5001

🔐 Authentication API
Register
POST /api/auth/register

Login
POST /api/auth/login


Response includes a JWT token used for socket authentication.

💬 Real-Time Chat (Socket.IO)
Socket Authentication

JWT is passed during connection:

io("http://localhost:5001", {
  auth: { token: YOUR_JWT }
});

Events
Event	Direction	Description
send_message	Client → Server	Send message
receive_message	Server → Client	Receive message
message_sent	Server → Sender	Delivery confirmation
🧪 Testing via CLI Clients

Open two terminals:

Terminal 1
node socket_arkt.js

Terminal 2
node socket_sp.js


Messages sent from one terminal appear instantly in the other.

🧠 What This Project Demonstrates

Secure backend design

Stateless authentication with JWT

Real-time bidirectional communication

Database-backed chat history

Clean project structure and Git hygiene

📌 Notes

node_modules/ and .env are excluded using .gitignore

Designed for learning & demonstration, not production deployment

Suitable for backend / full-stack interviews

👤 Author
