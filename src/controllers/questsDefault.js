const QuestsDefault = require("../models/QuestsDefault.model.js");

module.exports.new = (req, res) => {
  const newQuestsDefault = new QuestsDefault({
    questss: [{ ...req.body }]
  });
  newQuestsDefault.save().then(doc => {
    res.send(doc);
  });
};

module.exports.update = (req, res) => {
  QuestsDefault.findOneAndUpdate(
    {},
    { $push: { quests: { ...req.body } } },
    { new: true, upsert: true },
    (err, doc) => {
      if (err) console.log(err);
      res.send(doc);
    }
  );
};
