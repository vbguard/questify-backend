const mongoose = require("mongoose");
const QuestSchema = require("./Quest.schema");

const UsersQuestsSchema = new mongoose.Schema(
  {
    userID: {
      type: String
    },
    quests: {
      type: [QuestSchema]
    }
  },
  { timestamps: true }
);

const UsersQuests = mongoose.model("UsersQuests", UsersQuestsSchema);

module.exports = UsersQuests;
