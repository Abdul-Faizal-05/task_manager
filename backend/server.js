const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.mongo_db_url + "taskmanager";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const messageRoutes = require("./routes/message");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/messages", messageRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Socket.io connection handling
const Message = require("./models/message");

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join a specific task room
  socket.on("join-task", ({ taskId, user }) => {
    socket.join(taskId);
    console.log(`User ${user?.username} joined task ${taskId}`);

    // Notify others in the room
    socket.to(taskId).emit("user-joined", {
      user: user?.username,
      message: `${user?.username} joined the task`,
    });
  });

  // Leave task room
  socket.on("leave-task", (taskId) => {
    socket.leave(taskId);
    console.log(`User left task ${taskId}`);
  });

  // Handle chat messages
  socket.on("send-message", async (message) => {
    try {
      // Save message to database
      const newMessage = new Message({
        taskId: message.taskId,
        userId: message.userId,
        username: message.user,
        text: message.text,
        timestamp: message.timestamp || new Date(),
      });

      await newMessage.save();

      // Broadcast message to all users in the task room (including sender)
      io.to(message.taskId).emit("receive-message", message);
    } catch (error) {
      console.error("Error saving message:", error);
      // Still emit the message even if save fails (for real-time experience)
      io.to(message.taskId).emit("receive-message", message);
    }
  });

  // Handle drawing events
  socket.on("drawing", (data) => {
    socket.to(data.taskId).emit("draw", data);
  });

  // Handle canvas clear
  socket.on("clear-canvas", (taskId) => {
    socket.to(taskId).emit("clear-canvas");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
