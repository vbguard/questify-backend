const mongoose = require("mongoose");

const ChallengeSchema = require("./Challenge.schema");

const ChallengesDafaultSchema = new mongoose.Schema(
  {
    challenges: [ChallengeSchema]
  },
  { timestamps: true }
);

const ChallengesDafault = mongoose.model(
  "ChallengesDefault",
  ChallengesDafaultSchema
);

module.exports = ChallengesDafault;
