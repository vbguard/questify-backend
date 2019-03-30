const mongoose = require("mongoose");

const QuestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      required: true
    },
    dueDate: {
      type: Number,
      required: true
    },
    done: {
      type: Boolean,
      required: true
    },
    isQuest: {
      type: Boolean,
      default: true
    },
    isPriority: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = QuestSchema;
