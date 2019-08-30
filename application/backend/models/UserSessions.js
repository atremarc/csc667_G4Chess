const mongoose = require("mongoose");

const UserSessionSchema = new mongoose.Schema({
  userID: {
    type: String,
    default: ""
  },
  timeStart: {
    type: Date,
    default: Date.now
  },
  isDead: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("UserSession", UserSessionSchema);
