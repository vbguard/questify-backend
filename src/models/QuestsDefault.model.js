const mongoose = require("mongoose");

const QuestSchema = require("./Quest.schema");

const QuestsDefaultSchema = new mongoose.Schema(
  {
    quests: [QuestSchema]
  },
  { timestamps: true }
);

const QuestsDefault = mongoose.model("QuestsDefault", QuestsDefaultSchema);

module.exports = QuestsDefault;
