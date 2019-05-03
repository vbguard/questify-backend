const mongoose = require("mongoose");

const ChallengesDafaultSchema = new mongoose.Schema(
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

const ChallengesDafault = mongoose.model(
  "ChallengesDefault",
  ChallengesDafaultSchema
);

module.exports = ChallengesDafault;
