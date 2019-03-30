const ChallengesDefault = require("../models/ChallengesDefault.model.js");

module.exports.getAll = (req, res) => {
  ChallengesDefault.find().then(doc => {
    res.send(doc);
  });
};

module.exports.new = (req, res) => {
  const newChallengeDefault = new ChallengesDefault({
    challenges: [{ ...req.body }]
  });
  newChallengeDefault.save().then(doc => {
    res.send(doc);
  });
};

module.exports.update = (req, res) => {
  ChallengesDefault.findOneAndUpdate(
    {},
    { $push: { challenges: { ...req.body } } },
    { new: true, upsert: true },
    (err, doc) => {
      if (err) console.log(err);
      res.send(doc);
    }
  );
};
