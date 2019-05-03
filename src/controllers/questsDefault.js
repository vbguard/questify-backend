const QuestsDefault = require("../models/QuestsDefault.model");

module.exports.getAll = (req, res) => {
  QuestsDefault.find().then(doc => {
    res.send(doc);
  });
};

module.exports.new = (req, res) => {
  const newQuestsDefault = new QuestsDefault(req.body);

  newQuestsDefault.save().then(doc => {
    res.status(201).json(doc);
  });
};

module.exports.update = (req, res) => {
  // const fieldsUpdate = {};
  // req.body.fieldsUpdate.forEach( field => {

  // });

  QuestsDefault.findOneAndUpdate(
    { _id: req.body.questDefaultId },
    { $push: { quests: { ...req.body } } },
    { new: true, upsert: true },
    (err, doc) => {
      if (err) console.log(err);
      res.send(doc);
    }
  );
};
