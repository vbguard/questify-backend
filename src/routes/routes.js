const express = require("express");
const router = express.Router();
const cors = require("cors");
const notFoundHandler = require("../middleware/not-found");
const serverErrorHandler = require("../middleware/server-error");
const config = require("../../config/config");

// const UserController = require("../controllers/user");
const UserController = require("../controllers/user.controller");
const UserQuestsController = require("../controllers/quests");
const UserChallengesController = require("../controllers/challenges.js");
const QuestsDefaultController = require("../controllers/questsDefault");
const ChallengesDefaultController = require("../controllers/challengesDefault");

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
/**
 * @swagger
 *
 * /api/login:
 *   post:
 *     tags:
 *       - Login
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - nickname
 *             properties:
 *               nickname:
 *                 type: string
 *     responses:
 *       200:
 *         description: Return json with User data create
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: "Successfully created new user and his Finance Data. You can Login"
 *       400:
 *         description: If not correct data request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "error message written here"
 */
router.post("/login", UserController.userLogin);

// User Quests CRUD
/**
 * @swagger
 *
 * /api/quests:
 *   get:
 *     tags:
 *       - Quests CRUD
 *     responses:
 *       200:
 *         description: Return json with User data create
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  example: [{'first doc'}, {'second doc'}, {...}]
 *       400:
 *         description: If not correct data request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "error message written here"
 */
router.get("/quests", UserQuestsController.getAll);

/**
 * @swagger
 *
 * /api/quests:
 *   post:
 *     tags:
 *       - Quests CRUD
 *     responses:
 *       200:
 *         description: Return json with User data create
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  example: [{'first doc'}, {'second doc'}, {...}]
 *       400:
 *         description: If not correct data request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "error message written here"
 */
router.post("/quests", UserQuestsController.new);

/**
 * @swagger
 *
 * /api/quests:
 *   get:
 *     tags:
 *       - Quests CRUD
 *     responses:
 *       200:
 *         description: Return json with User data create
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  example: [{'first doc'}, {'second doc'}, {...}]
 *       400:
 *         description: If not correct data request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "error message written here"
 */
router.put("/quests/:questId", UserQuestsController.update);

/**
 * @swagger
 *
 * /api/quests/{questId}:
 *   delete:
 *     tags:
 *       - Quests CRUD
 *     responses:
 *       200:
 *         description: Return json with User data create
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                quest:
 *                  type: array
 *                  example: {delete quest}
 *       400:
 *         description: If not correct data request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "error message written here"
 */
router.delete("/quests/:questId", UserQuestsController.delete);

// User Challenges CRUD
/**
 * @swagger
 *
 * /api/challenges/{challengeId}:
 *   put:
 *     tags:
 *       - Challenges
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name:
 *                type: string
 *                required: true
 *                example: Basic name for challenge
 *              group:
 *                type: string
 *                required: true
 *                example: Learning
 *              difficulty:
 *                type: string
 *                required: true
 *                example: Easy
 *              dueData:
 *                type: number
 *                required: true
 *                example: 1282172623
 *              done:
 *                type: boolean
 *                example: true
 *              isQuest:
 *                type: boolean
 *                example: true
 *              challengeSendToUser:
 *                type: boolean
 *                example: false
 *     responses:
 *       200:
 *         description: Return json with User data create
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: "Successfully created new user and his Finance Data. You can Login"
 *       400:
 *         description: If not correct data request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "error message written here"
 */
router.put("/challenges/:challengeId", UserChallengesController.update);

// Challenges Default CRUD
// router.get("/default/challenges", ChallengesDefaultController.getAll);
/**
 * @swagger
 *
 * /api/default/challenges:
 *   post:
 *     tags:
 *       - Default
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - nickname
 *             properties:
 *              name:
 *                type: string
 *                required: true
 *                example: Basic name for challenge
 *              group:
 *                type: string
 *                required: true
 *                example: Learning
 *              difficulty:
 *                type: string
 *                required: true
 *                example: Easy
 *              dueData:
 *                type: number
 *                required: true
 *                example: 1282172623
 *              done:
 *                type: boolean
 *                example: true
 *              isQuest:
 *                type: boolean
 *                example: true
 *              challengeSendToUser:
 *                type: boolean
 *                example: false
 *     responses:
 *       200:
 *         description: Return json with User data create
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: "Successfully created new user and his Finance Data. You can Login"
 *       400:
 *         description: If not correct data request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "error message written here"
 */
router.post("/default/challenges", ChallengesDefaultController.new);
/**
 * @swagger
 *
 * /api/default/challenges:
 *   put:
 *     tags:
 *       - Default
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - nickname
 *             properties:
 *              name:
 *                type: string
 *                required: true
 *                example: Basic name for challenge
 *              group:
 *                type: string
 *                required: true
 *                example: Learning
 *              difficulty:
 *                type: string
 *                required: true
 *                example: Easy
 *              dueData:
 *                type: number
 *                required: true
 *                example: 1282172623
 *              done:
 *                type: boolean
 *                example: true
 *              isQuest:
 *                type: boolean
 *                example: true
 *              challengeSendToUser:
 *                type: boolean
 *                example: false
 *     responses:
 *       200:
 *         description: Return json with User data create
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: "Successfully created new user and his Finance Data. You can Login"
 *       400:
 *         description: If not correct data request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "error message written here"
 */
router.put("/default/challenges", ChallengesDefaultController.update);
// router.delete(
//   "/default/challenges/:challengeId",
//   ChallengesDefaultController.delete
// );

// Quests Default CRUD
/**
 * @swagger
 *
 * /api/default/quests:
 *   get:
 *     tags:
 *       - Default
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - nickname
 *             properties:
 *              name:
 *                type: string
 *                required: true
 *                example: Basic name for challenge
 *              group:
 *                type: string
 *                required: true
 *                example: Learning
 *              difficulty:
 *                type: string
 *                required: true
 *                example: Easy
 *              dueData:
 *                type: number
 *                required: true
 *                example: 1282172623
 *              done:
 *                type: boolean
 *                example: true
 *              isQuest:
 *                type: boolean
 *                example: true
 *              challengeSendToUser:
 *                type: boolean
 *                example: false
 *     responses:
 *       200:
 *         description: Return json with User data create
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: "Successfully created new user and his Finance Data. You can Login"
 *       400:
 *         description: If not correct data request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "error message written here"
 */
router.get("/default/quests", QuestsDefaultController.getAll);

/**
 * @swagger
 *
 * /api/default/quests:
 *   post:
 *     tags:
 *       - Default
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - nickname
 *             properties:
 *              name:
 *                type: string
 *                required: true
 *                example: Basic name for challenge
 *              group:
 *                type: string
 *                required: true
 *                example: Learning
 *              difficulty:
 *                type: string
 *                required: true
 *                example: Easy
 *              dueData:
 *                type: number
 *                required: true
 *                example: 1282172623
 *              done:
 *                type: boolean
 *                example: true
 *              isQuest:
 *                type: boolean
 *                example: true
 *              challengeSendToUser:
 *                type: boolean
 *                example: false
 *     responses:
 *       200:
 *         description: Return json with User data create
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: "Successfully created new user and his Finance Data. You can Login"
 *       400:
 *         description: If not correct data request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "error message written here"
 */
router.post("/default/quests", QuestsDefaultController.new);
/**
 * @swagger
 *
 * /api/default/quests:
 *   put:
 *     tags:
 *       - Default
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - nickname
 *             properties:
 *              name:
 *                type: string
 *                required: true
 *                example: Basic name for challenge
 *              group:
 *                type: string
 *                required: true
 *                example: Learning
 *              difficulty:
 *                type: string
 *                required: true
 *                example: Easy
 *              dueData:
 *                type: number
 *                required: true
 *                example: 1282172623
 *              done:
 *                type: boolean
 *                example: true
 *              isQuest:
 *                type: boolean
 *                example: true
 *              challengeSendToUser:
 *                type: boolean
 *                example: false
 *     responses:
 *       200:
 *         description: Return json with User data create
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: "Successfully created new user and his Finance Data. You can Login"
 *       400:
 *         description: If not correct data request
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "error message written here"
 */
router.put("/default/quests", QuestsDefaultController.update);
// router.delete("/default/quests/:questsId", QuestsDefaultController.delete);

router.use(notFoundHandler);
router.use(serverErrorHandler);

module.exports = router;
