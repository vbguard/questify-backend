const mongoose = require("mongoose");

const QuestsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
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
      default: true
    },
    isPriority: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Quests = mongoose.model("Quests", QuestsSchema);

module.exports = Quests;
