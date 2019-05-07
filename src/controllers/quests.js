const Quests = require("../models/Quests.model");
const Dashboard = require("../models/Dashboard.model");

module.exports.getAll = (req, res) => {
  Quests.find({}, (err, docs) => {
    if (err) {
      res.status(400).json({
        error: true,
        message: err.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Send all quests all users",
      quests: docs
    });
  });
};

module.exports.new = (req, res) => {
  const newData = req.body;
  const newQuests = new Quests(newData);

  Dashboard.findOneAndUpdate(
    { userId: newData.userId },
    { $push: { quests: newQuests._id } },
    () => {
      newQuests.save().then(quest => {
        res.status(201).json({
          success: true,
          message: "New Quest successfully saved and returned this...",
          quest: quest
        });
      });
    }
  );
};

module.exports.update = (req, res) => {
  const fieldUpdate = req.body;
  const questId = req.params.questId;
  console.log(questId);
  console.log(fieldUpdate);

  Quests.findByIdAndUpdate(
    questId,
    { $set: { ...fieldUpdate } },
    { new: true },
    (err, quest) => {
      if (err) {
        res.status(400).json({
          error: true,
          message: err.message
        });
      }
      console.log(quest);
      res.status(201).json({
        success: true,
        message: "New Quest successfully saved and returned this...",
        quest: quest
      });
    }
  );
};

module.exports.delete = (req, res) => {
  Quests.findOneAndDelete({ _id: req.params.questId }, (err, quest) => {
    if (err) {
      res.status(400).json({
        error: true,
        message: err.message
      });
    }
    res.status(201).json({
      success: true,
      message: "Quest successfully delete",
      quest: quest
    });
  });
};
