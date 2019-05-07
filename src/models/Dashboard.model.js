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
      ref: "Quests"
    }
  ],
  challengeSend: {
    type: Schema.Types.ObjectId,
    ref: "Challenges"
  },
  allChallenges: [
    {
      type: Schema.Types.ObjectId,
      ref: "Challenges"
    }
  ]
});

const Dashboard = mongoose.model("Dashboard", DashboardSchema);

module.exports = Dashboard;
