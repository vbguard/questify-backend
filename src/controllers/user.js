const async = require("async");
const User = require("../models/User.model.js");
const UsersQuests = require("../models/UsersQuests.model");
const UsersChallenges = require("../models/UsersChallenges.model");
const QuestsDefault = require("../models/QuestsDefault.model.js");
const ChallengesDefault = require("../models/ChallengesDefault.model.js");

// Get User data by Id
module.exports.getUser = (req, res) => {
  res.status(200).json({
    id: req.user.id,
    nickname: req.user.nickname
  });
};

// Logout User
module.exports.userLogout = (req, res) => {
  req.logout();
  res.status(200).json({
    message: "User successfully logout"
  });
};

// Login User and get him Token for access to some route action
module.exports.userLogin = (req, res) => {
  User.findOne({ ...req.body }, (err, doc) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }

    if (!doc) {
      async.series(
        {
          user: function(cb) {
            setTimeout(function() {
              const newUser = new User({
                nickname: req.body.nickname
              });
              newUser.save().then(user => cb(null, user));
            }, 100);
          },
          userQuestsDefault: function(cb) {
            setTimeout(function() {
              QuestsDefault.find().then(doc => cb(null, doc[0]));
            }, 100);
          },
          userQuests: function(cb) {
            setTimeout(function() {
              const newUserQuests = new UsersQuests();
              newUserQuests.save().then(doc => cb(null, doc));
            }, 100);
          },
          userChallenges: function(cb) {
            setTimeout(function() {
              const newUserChallenges = new UsersChallenges();
              newUserChallenges.save().then(doc => cb(null, doc));
            }, 100);
          },
          userChallengesDefault: function(cb) {
            setTimeout(function() {
              ChallengesDefault.find().then(doc => {
                cb(null, doc[0]);
              });
            });
          }
        },
        function(err, results) {
          if (err) {
            res.status(400).json({
              success: false,
              message: err.message
            });
          }

          const {
            user,
            userQuestsDefault,
            userQuests,
            userChallenges,
            userChallengesDefault
          } = results;

          const respData = {};
          UsersQuests.findOneAndUpdate(
            { _id: userQuests._id },
            {
              $set: {
                quests: [...userQuestsDefault.quests],
                userID: String(user._id)
              }
            },
            { new: true, upsert: true },
            err => {
              if (err) {
                res.status(400).json({
                  success: false,
                  message: err.message
                });
              }

              UsersChallenges.findOneAndUpdate(
                { _id: userChallenges._id },
                {
                  $set: {
                    challenges: [...userChallengesDefault.challenges],
                    userID: String(user._id)
                  }
                },
                { new: true, upsert: true },
                err => {
                  if (err) {
                    res.status(400).json({
                      success: false,
                      message: err.message
                    });
                  }

                  User.findOneAndUpdate(
                    { _id: user._id },
                    {
                      $set: {
                        questsID: String(userQuests._id),
                        challengesID: String(userChallenges._id)
                      }
                    },
                    {
                      new: true,
                      upsert: true
                    },
                    (err, newUser) => {
                      if (err) {
                        res.status(400).json({
                          success: false,
                          message: err.message
                        });
                      }

                      // Logic to response
                      respData.user = newUser;

                      UsersQuests.findOne({ userID: newUser._id }).then(doc => {
                        if (!doc) {
                          res.status(400).json({
                            success: false,
                            message: "Not found User Quest for this user ID"
                          });
                        }

                        respData.tasks = Array.from(doc.quests);

                        UsersChallenges.findOne({
                          userID: newUser._id
                        }).then(doc => {
                          if (!doc) {
                            res.status(400).json({
                              success: false,
                              message: "Not found User Quest for this user ID"
                            });
                          }

                          const getOneArray = Array.from(doc.challenges).filter(
                            item => item.challengeSendToUser !== "true"
                          )[
                            Math.round(
                              Math.random() * (doc.challenges.length - 1)
                            )
                          ];
                          respData.tasks = [...respData.tasks, getOneArray];
                          res.status(200).json({
                            success: true,
                            message:
                              "Successfully created new user and his quests. You can Login",
                            data: respData
                          });
                        });
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }

    if (doc) {
      const respData = {};

      UsersQuests.findOne({ userID: doc._id }, (err, quest) => {
        if (!quest) {
          res.status(400).json({
            success: false,
            message: "Not found User Quest for this user ID"
          });
        }

        respData.tasks = Array.from(quest.quests);

        UsersChallenges.findOne(
          {
            userID: doc._id
          },
          (err, challenge) => {
            if (err) {
              res.status(400).json({
                success: false,
                message: "Not found User Quest for this user ID"
              });
            }

            const getOneArray = Array.from(challenge.challenges).filter(
              item => item.challengeSendToUser !== "true"
            )[Math.round(Math.random() * (challenge.challenges.length - 1))];

            respData.tasks = [...respData.tasks, getOneArray];

            res.status(200).json({
              success: true,
              message: "Successfully user logined and his Quests send",
              data: respData
            });
          }
        );
      });
    }
  });
};
