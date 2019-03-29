const mongoose = require("mongoose");

const ChallengeSchema = require("./Challenge.schema");

const UsersChallengesSchema = new mongoose.Schema(
  {
    userID: {
      type: String
    },
    challenges: [ChallengeSchema]
  },
  { timestamps: true }
);

const UsersChallenges = mongoose.model("UserChallenges", UsersChallengesSchema);

module.exports = UsersChallenges;
