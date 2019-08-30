const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  user1: {
    type: String,
    default: ""
  },
  user2: {
    type: String,
    default: ""
  },
  fen: {
    type: String,
    default: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  },
  whiteTurn: {
    type: Boolean,
    default: true
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  result: {
    type: String,
    default: ""
  },
  timeStarted: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Game", GameSchema);
