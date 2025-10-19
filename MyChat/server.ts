import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" }, // frontend access
});

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("join", (userId: string) => {
    console.log(`User ${userId} joined with socket ${socket.id}`);
  });

  socket.on("sendMessage", (msg) => {
    console.log("Message received:", msg);
    io.emit("receiveMessage", msg); // broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 4000;
httpServer.listen(PORT, () => console.log(`Socket server running on ${PORT}`));