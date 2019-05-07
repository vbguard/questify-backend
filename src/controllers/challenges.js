const Challenges = require("../models/Challenges.model");

module.exports.getAll = (req, res) => {
  Challenges.find({}, (err, docs) => {
    if (err) {
      res.status(400).json({
        error: true,
        message: err.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Send all challenges all users",
      quests: docs
    });
  });
};

module.exports.update = (req, res) => {
  const fieldUpdate = req.body.fieldUpdate;
  const challengeId = req.body.challengeId;

  Challenges.findOneAndUpdate(
    { _id: challengeId },
    { $set: { fieldUpdate } },
    { new: true, upsert: true },
    (err, challenge) => {
      if (err) {
        res.status(400).json({
          error: true,
          message: err.message
        });
      }
      res.status(201).json({
        success: true,
        message: "Update challenge successfully saved and returned this...",
        challenge: challenge
      });
    }
  );
};
