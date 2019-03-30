const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema(
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
      type: Date,
      default: Date.now()
    },
    done: {
      type: Boolean,
      default: false
    },
    isQuest: {
      type: Boolean,
      default: false
    },
    challengeSendToUser: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = ChallengeSchema;
