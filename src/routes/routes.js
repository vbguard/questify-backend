const express = require("express");
const router = express.Router();
const passport = require("passport");
const cors = require("cors");
const notFoundHandler = require("../middleware/not-found");
const serverErrorHandler = require("../middleware/server-error");
const config = require("../../config/config");

const UserController = require("../controllers/user");
// const UserQuestsController = require("../controllers/quests");
const QuestsDefaultController = require("../controllers/questsDefault");
const ChallengesDefaultController = require("../controllers/challengesDefault");

const passportCheck = (req, res, next) =>
  passport.authenticate("jwt", {
    session: false,
    failWithError: true
  })(req, res, next);

const setupCORSForDevelopment = developmentUrl => {
  const corsOptions = {
    origin: developmentUrl,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Content-Length",
      "X-Requested-With",
      "Accept"
    ],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"]
  };

  router.use(cors(corsOptions));
};

if (process.env.NODE_ENV === "development") {
  const { client } = config;
  const developmentUrl = `${client.development.url}:${client.development.port}`;

  setupCORSForDevelopment(developmentUrl);
}

if (process.env.NODE_ENV === "production") {
  // Setup CORS for production
}

// Login

router.post("/login", UserController.userLogin);

// Routes Must have checked function of JWT exp
router.get("/logout", passportCheck, UserController.userLogout);

// User Quests CRUD
// router.get("/quests/:userId", passportCheck, UserQuestsController.getAllQuests);
// router.post("/quests/:userId", UserQuestsController.saveNewQuest);
// router.put("/quests/:userId", UserQuestsController.updateQuest);
// router.delete("/quests/:userId", UserQuestsController.deleteQuest);

// // User Challenges CRUD
// router.get("/challenges/:userId", UserChallengesController.getAll);
// router.post("/challenges/:userId", UserChallengesController.new);
// router.put("/challenges/:userId", UserChallengesController.update);
// router.delete("/challenges/:userId", UserChallengesController.delete);

// // Challenges Default CRUD
// router.get("/default/challenges", ChallengesDefaultController.getAll);
router.post("/default/challenges", ChallengesDefaultController.new);
router.put("/default/challenges", ChallengesDefaultController.update);
// router.delete(
//   "/default/challenges/:challengeId",
//   ChallengesDefaultController.delete
// );

// // Quests Default CRUD
// // Challenges Default CRUD
// router.get("/default/quests", QuestsDefaultController.getAll);
router.post("/default/quests", QuestsDefaultController.new);
// router.put("/default/quests/:questsId", ChallengesDefaultController.update);
// router.delete("/default/quests/:questsId", ChallengesDefaultController.delete);

router.use(notFoundHandler);
router.use(serverErrorHandler);

module.exports = router;
