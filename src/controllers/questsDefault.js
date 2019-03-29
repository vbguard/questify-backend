const QuestsDefault = require("../models/QuestsDefault.model.js");

module.exports.new = (req, res) => {
  QuestsDefault.findOneAndUpdate(
    {},
    { $push: { quests: { ...req.body } } },
    (err, doc) => {
      if (err) console.log(err);
      res.send(doc);
    }
  );
};
