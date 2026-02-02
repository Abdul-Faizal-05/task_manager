const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "Task ID is required"],
      index: true, // Index for faster queries
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    text: {
      type: String,
      required: [true, "Message text is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

// Index for efficient querying by task and timestamp
messageSchema.index({ taskId: 1, timestamp: 1 });

// Index for querying by user
messageSchema.index({ userId: 1 });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
