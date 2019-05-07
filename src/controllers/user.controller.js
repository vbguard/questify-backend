const User = require("../models/User.model.js");
const Dashboard = require("../models/Dashboard.model");
const Quests = require("../models/Quests.model");
const Challenges = require("../models/Challenges.model");
const QuestsDefault = require("../models/QuestsDefault.model.js");
const ChallengesDefault = require("../models/ChallengesDefault.model.js");

module.exports.userLogin = (req, res) => {
  try {
    const { nickname } = req.body;

    // ? Check have USER in DB => query search by field 'nickname'

    User.findOne({ nickname: nickname }, async (err, user) => {
      if (err) {
        res.status(404).json({
          success: false,
          message: err.message
        });
      }

      //! if have USER in DB. Return in response his Quests and One Challenge this USER
      if (user) {
        const getUser = await User.findOne({ _id: user._id });

        const getDashboard = await Dashboard.findOne({ userId: getUser._id });

        if (!getDashboard.challengeSend) {
          const getUserChallenges = await Challenges.find({ userId: user._id });

          const getChallengesNotSendUser = getUserChallenges.filter(
            challenge => !challenge.challengeSendToUser
          );

          getDashboard.challengeSend =
            getChallengesNotSendUser[
              Math.floor(Math.random() * getChallengesNotSendUser.length)
            ];
          getDashboard.save((err, newDashboard) => {
            if (err) throw err;

            if (newDashboard) {
              Quests.populate(
                getDashboard,
                { path: "quests", model: "Quests" },
                (err, getQuests) => {
                  if (err) {
                    throw err;
                  }

                  Challenges.populate(
                    getQuests,
                    { path: "challengeSend", model: "Challenges" },
                    (err, allQuestsWithChallenge) => {
                      if (err) {
                        throw err;
                      }

                      res.status(200).json({
                        success: true,
                        message:
                          "User successfully created and his quests and challenges. One challenges send by get randomly",
                        data: {
                          tasks: allQuestsWithChallenge.challengeSend
                            ? [
                                ...allQuestsWithChallenge.quests,
                                allQuestsWithChallenge.challengeSend
                              ]
                            : [...allQuestsWithChallenge.quests],
                          user: getUser
                        }
                      });
                    }
                  );
                }
              );
            }
          });
        }

        await Quests.populate(
          getDashboard,
          { path: "quests", model: "Quests" },
          (err, getQuests) => {
            if (err) {
              throw err;
            }

            Challenges.populate(
              getQuests,
              { path: "challengeSend", model: "Challenges" },
              (err, allQuestsWithChallenge) => {
                if (err) {
                  throw err;
                }

                res.status(200).json({
                  success: true,
                  message:
                    "User successfully created and his quests and challenges. One challenges send by get randomly",
                  data: {
                    tasks: allQuestsWithChallenge.challengeSend
                      ? [
                          ...allQuestsWithChallenge.quests,
                          allQuestsWithChallenge.challengeSend
                        ]
                      : [...allQuestsWithChallenge.quests],
                    user: getUser
                  }
                });
              }
            );
          }
        );
      }

      //! if not Have USER in DB create him and defaults quests and challenges, after response created documents

      if (!user) {
        const log = {
          user: {},
          dashboard: {}
        };

        //* Create new user in DB
        const newUser = new User({ nickname: nickname });

        //* get his _id for create new Dashboard doc in DB
        const userId = newUser._id;

        /**
         *! This fields must be created and have some doc(data)
         *@params
         **  quests - [] -> array from object {quest}
         ** // // challengeSend - {id} -> objectId of challenge and this field auto changed if user complete or cancel
         **  allChallenges - [] -> array from {challenges}
         */

        const newDashboard = new Dashboard({ userId: userId });
        //? Save Dashboard id to new USER
        newUser.dashboard = newDashboard._id;
        newUser.save((err, user) => {
          if (err) {
            log.user.error = err.message;
          }

          if (user) {
            log.user.success = true;
          }
        });

        //! Get today Date for update documents
        const today = new Date();

        //? Clone default quests from QuestsDefault collections to quests collections with this new User
        const defaultQuests = await QuestsDefault.find().lean();

        const defaultQuestsWithUserId = defaultQuests.map(quest => {
          quest.dueDate = today;

          return {
            dueDate: quest.dueDate,
            name: quest.name,
            group: quest.group,
            difficulty: quest.difficulty,
            userId
          };
        });

        //* insert this document to quests collections
        const addedQuests = await Quests.insertMany(defaultQuestsWithUserId);

        //* get id from new challenges created and updated. After Save this id in Dashboard this new User
        newDashboard.quests = [...addedQuests.map(quest => quest._id)];
        if (addedQuests) {
          log.dashboard.quests = true;
        }

        //? Clone default challenges from ChallengesDefault collections to challenges collections with this new User
        const defaultChallenges = await ChallengesDefault.find().lean();

        const defaultChallengesWithUserId = defaultChallenges.map(challenge => {
          challenge.dueDate = new Date(today.setDate(today.getDate() + 7));

          return {
            dueDate: challenge.dueDate,
            name: challenge.name,
            group: challenge.group,
            difficulty: challenge.difficulty,
            userId
          };
        });

        //* insert this document to quests collections
        const addedChallenges = await Challenges.insertMany(
          defaultChallengesWithUserId
        );

        //* get id from new challenges created and updated. After Save this id in Dashboard this new User
        newDashboard.allChallenges = [
          ...addedChallenges.map(challenge => challenge._id)
        ];

        const getRandomOneChallenge =
          addedChallenges[Math.floor(Math.random() * addedChallenges.length)];

        newDashboard.challengeSend = getRandomOneChallenge;

        if (addedChallenges) {
          log.dashboard.allChallenges = true;
        }

        newDashboard.save((err, dashboard) => {
          if (err) {
            log.dashboard.error = err.message;
          }
          if (dashboard) {
            log.dashboard.success = true;
          }
        });

        const getUser = await User.findOne({ _id: userId });

        const getDashboard = await Dashboard.findOne({ userId: getUser._id });

        Quests.populate(
          getDashboard,
          { path: "quests", model: "Quests" },
          (err, getQuests) => {
            if (err) {
              throw err;
            }

            Challenges.populate(
              getQuests,
              { path: "challengeSend", model: "Challenges" },
              (err, allQuestsWithChallenge) => {
                if (err) {
                  throw err;
                }

                res.status(200).json({
                  success: true,
                  message:
                    "User successfully created and his quests and challenges. One challenges send by get randomly",
                  data: {
                    tasks: [
                      ...allQuestsWithChallenge.quests,
                      allQuestsWithChallenge.challengeSend
                    ],
                    user: getUser
                  }
                });
              }
            );
          }
        );
      }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
