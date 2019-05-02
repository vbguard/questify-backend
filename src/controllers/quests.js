const UsersQuests = require("../models/UsersQuests.model");

module.exports.getAll = (req, res) => {
  UsersQuests.find({}, (err, docs) => {
    if (err) {
      res.status(400).json({
        error: true,
        message: err.message
      });
    }

    res.json({ data: docs });
  });
};

module.exports.new = (req, res) => {
  const newQuestsDefault = new UsersQuests({
    quests: [{ ...req.body }]
  });
  newQuestsDefault.save().then(doc => {
    res.json({ data: doc });
  });
};

module.exports.update = (req, res) => {
  const fieldUpdate = req.body.fieldUpdate;
  const questId = req.body.questId;

  UsersQuests.findOneAndUpdate(
    { _id: questId },
    { $set: { fieldUpdate } },
    { new: true, upsert: true },
    (err, doc) => {
      if (err) {
        res.status(400).json({
          error: true,
          message: err.message
        });
      }
      res.json({ data: doc });
    }
  );
};

module.exports.delete = (req, res) => {
  UsersQuests.findOneAndDelete({ _id: req.body.questId }, (err, doc) => {
    if (err) {
      res.status(400).json({
        error: true,
        message: err.message
      });
    }
    res.json({ data: doc });
  });
};
