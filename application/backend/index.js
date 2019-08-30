var express = require("express");
var port = 9000;
var app = express();

//create server for sockets
var server = require("http").createServer(app);
var io = require("socket.io")(server);

//connect to MongoDB Atlas Database
const config = require("./config/config");
const mongoose = require("mongoose");
mongoose.connect(config.db, { useNewUrlParser: true, useFindAndModify: false });
mongoose.Promise = global.Promise;

//used to parse requests to the backend routes
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cors = require("cors");
app.use(cors());
require("./routes/userRoutes")(app);
require("./routes/gameRoutes")(app);

server.listen(port, function() {
  console.log("listening on port: ", port);
});

app.get("/", function(req, res) {
  res.send("This is CSC667 Team 04's HomePage");
});

io.sockets.on("connection", function(socket) {
  // disconnect
  socket.on("disconnect", function() {
    console.log("a user has disconnected");
  });

  // join room in socket for specific game
  socket.on("room", function(room) {
    console.log("User has joined a room.", room);
    socket.join(room);
  });

  // sent when chess piece is moved
  socket.on("chessMoved", function(room, gameFEN) {
    console.log("chessMove Called.", gameFEN);
    socket.to(room).emit("updateGameFen", gameFEN);
  });

  // send message
  socket.on("message", function(room, message) {
    console.log("message sent.", message);
    socket.to(room).emit("message", message);
  });
});
