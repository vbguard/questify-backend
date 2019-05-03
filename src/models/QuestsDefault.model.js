const mongoose = require("mongoose");

const QuestsDefaultSchema = new mongoose.Schema(
  {
    dueDate: Date,
    isQuest: Boolean,
    isPriority: Boolean,
    name: String,
    group: String,
    difficulty: String,
    done: Boolean
  },
  { timestamps: true }
);

const QuestsDefault = mongoose.model("QuestsDefault", QuestsDefaultSchema);

module.exports = QuestsDefault;
