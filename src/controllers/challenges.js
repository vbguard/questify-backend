const Challenges = require("../models/Challenges.model");
const Dashboard = require("../models/Dashboard.model");

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
  const updateFields = req.body.updateFields;
  const userId = req.body.userId;
  const challengeId = req.params.challengeId;

  if (!updateFields.challengeSendToUser) {
    console.log(userId);
    Dashboard.findOneAndUpdate(
      { userId: userId },
      {
        $unset: { challengeSend: "" }
      },
      { new: true },
      (err, updatedDashboard) => {
        if (err) console.log(err);
        console.log(updatedDashboard);
      }
    );
  }

  if (updateFields.challengeSendToUser && updateFields.done) {
    console.log("clean dashboard from challenge Done");
    console.log(userId);
    Dashboard.findOneAndUpdate(
      { userId: userId },
      {
        $unset: { challengeSend: "" }
      },
      { new: true },
      (err, updatedDashboard) => {
        if (err) console.log(err);
        console.log(updatedDashboard);
      }
    );
  }

  Challenges.findByIdAndUpdate(
    challengeId,
    { $set: updateFields },
    { new: true },
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
