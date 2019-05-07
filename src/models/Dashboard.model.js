const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  quests: [
    {
      type: Schema.Types.ObjectId,
      ref: "UsersQuests"
    }
  ],
  challengeSend: {
    type: Schema.Types.ObjectId,
    ref: "UserChallenges"
  },
  allChallenges: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserChallenges"
    }
  ]
});

const Dashboard = mongoose.model("Dashboard", DashboardSchema);

module.exports = Dashboard;
