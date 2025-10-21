import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import Message from '../src/models/Message';
import { connectToDb } from '../src/lib/db';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

// ✅ MongoDB Connect (React useEffect নয়, সরাসরি Node async)
(async () => {
  try {
    await connectToDb();
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
})();

// Active users list
const activeUsers: Record<string, string> = {}; // userId -> socketId

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  // Add user
  socket.on('addUser', (userId: string) => {
    activeUsers[userId] = socket.id;
    io.emit('getUsers', Object.keys(activeUsers));
  });

  // Receive and save message
  socket.on('sendMessage', async ({ sender, receiver, text }) => {
    try {
      console.log("💬 Message received from:", sender);

      // Save message to MongoDB
      const message = await Message.create({ sender, receiver, text });
      console.log("✅ Message saved:", message);

      // Send message to receiver if online
      const receiverSocket = activeUsers[receiver];
      if (receiverSocket) {
        io.to(receiverSocket).emit('getMessage', message);
      }
    } catch (err) {
      console.error("❌ Error saving message:", err);
    }
  });

  socket.on('disconnect', () => {
    for (let userId in activeUsers) {
      if (activeUsers[userId] === socket.id) {
        delete activeUsers[userId];
        break;
      }
    }
    io.emit('getUsers', Object.keys(activeUsers));
  });
});
// const PORT = process.env.PORT || 8080;

server.listen(8080 , () => {
  console.log('🚀 Socket server running on 4000');
});