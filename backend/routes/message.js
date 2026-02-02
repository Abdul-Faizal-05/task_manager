const express = require("express");
const router = express.Router();
const Message = require("../models/message");

// Get all messages for a specific task
router.get("/task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { limit = 100, before } = req.query;

    // Build query
    const query = { taskId };
    if (before) {
      query.timestamp = { $lt: new Date(before) };
    }

    const messages = await Message.find(query)
      .populate("userId", "username email role")
      .sort({ timestamp: 1 }) // Oldest first
      .limit(parseInt(limit));

    res.json({
      message: "Messages retrieved successfully",
      messages: messages,
      count: messages.length,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      message: "Server error while fetching messages",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Create a new message (also handled via Socket.io, but available as REST endpoint)
router.post("/create", async (req, res) => {
  try {
    const { taskId, userId, username, text } = req.body;

    // Validate required fields
    if (!taskId || !userId || !username || !text) {
      return res.status(400).json({
        message: "Please provide taskId, userId, username, and text",
      });
    }

    // Create new message
    const newMessage = new Message({
      taskId,
      userId,
      username,
      text,
      timestamp: new Date(),
    });

    await newMessage.save();

    // Populate user data before sending response
    await newMessage.populate("userId", "username email role");

    res.status(201).json({
      message: "Message saved successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error creating message:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((e) => e.message)
          .join(", "),
      });
    }

    res.status(500).json({
      message: "Server error while creating message",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Delete a message (soft delete or hard delete)
router.delete("/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userId } = req.body; // To verify ownership

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    // Verify that the user owns the message
    if (userId && message.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You can only delete your own messages",
      });
    }

    await Message.findByIdAndDelete(messageId);

    res.json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({
      message: "Server error while deleting message",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Update/Edit a message
router.put("/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    const { text, userId } = req.body;

    if (!text || !userId) {
      return res.status(400).json({
        message: "Please provide text and userId",
      });
    }

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    // Verify that the user owns the message
    if (message.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You can only edit your own messages",
      });
    }

    message.text = text;
    message.isEdited = true;
    message.editedAt = new Date();

    await message.save();

    res.json({
      message: "Message updated successfully",
      data: message,
    });
  } catch (error) {
    console.error("Error updating message:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((e) => e.message)
          .join(", "),
      });
    }

    res.status(500).json({
      message: "Server error while updating message",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Get message count for a task
router.get("/task/:taskId/count", async (req, res) => {
  try {
    const { taskId } = req.params;

    const count = await Message.countDocuments({ taskId });

    res.json({
      message: "Message count retrieved successfully",
      count: count,
    });
  } catch (error) {
    console.error("Error counting messages:", error);
    res.status(500).json({
      message: "Server error while counting messages",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
