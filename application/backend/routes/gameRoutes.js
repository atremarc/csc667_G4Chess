const User = require("../models/User");
const UserSession = require("../models/UserSessions");
const Game = require("../models/Game");

module.exports = app => {
  //createGame
  //this route creates a new instance of a chess game
  //request url -> createGame
  //response -> {}
  app.post("/createGame", (req, res) => {
    const { body } = req;
    const { token, username } = body;

    UserSession.findById(token, (err, userSession) => {
      if (err) {
        return res.send({
          success: false,
          message: "user session server error"
        });
      } else if (!userSession || userSession.isDead) {
        return res.send({
          success: false,
          message: "invalid token"
        });
      } else {
        const newGame = new Game();
        newGame.user1 = username;
        newGame.save((err, newGame) => {
          if (err) {
            return res.send({
              success: false,
              message: "game server error"
            });
          } else {
            return res.send({
              success: true,
              message: "game created",
              gameID: newGame._id
            });
          }
        });
      }
    });
  });

  //openGames
  //this route gets all the open games that the user can join
  //request url -> /:username/openGames
  //response -> { games[]}
  app.get("/:username/openGames", (req, res) => {
    const { params } = req;
    const { username } = params;

    User.find({ username: username }, (err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: "user server error"
        });
      } else if (!user) {
        return res.send({
          success: false,
          message: "invalid user"
        });
      } else {
        Game.find({
          isOpen: true,
          user1: { $ne: username },
          user2: { $ne: username }
        })
          .sort({ timeStarted: 1 })
          .exec((err, openGames) => {
            if (err) {
              return res.send({
                success: false,
                message: "game server error"
              });
            } else {
              return res.send(openGames);
            }
          });
      }
    });
  });

  //currentGames
  //this route gets all the games that the user has joined and not finished
  //request url -> /:username/currentGames
  //response -> { games[]}
  app.get("/:username/currentGames", (req, res) => {
    const { params } = req;
    const { username } = params;

    User.find({ username: username, isDone: false }, (err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: "user server error"
        });
      } else if (!user) {
        return res.send({
          success: false,
          message: "invalid user"
        });
      } else {
        Game.find()
          .or([{ user1: username }, { user2: username }])
          .exec((err, myGames) => {
            if (err) {
              return res.send({
                success: false,
                message: "game server error"
              });
            } else {
              return res.send(myGames);
            }
          });
      }
    });
  });

  //getGame
  //this route gets the specific game given by the gameID
  //request url -> getGame
  //response -> { game }
  app.get("/:gameID/getGame", (req, res) => {
    const { params } = req;
    const { gameID } = params;

    Game.findById(gameID, (err, game) => {
      if (err) {
        return res.send({
          success: false,
          message: "game server error"
        });
      } else if (!game) {
        return res.send({
          success: false,
          message: "invalid game"
        });
      } else {
        return res.send(game);
      }
    });
  });

  //joinGame
  //this route adds a player to a game
  //request url -> joinGame
  //response -> {}
  app.put("/joinGame", (req, res) => {
    const { body } = req;
    const { token, username, gameID } = body;

    UserSession.findById(token, (err, userSession) => {
      if (err) {
        return res.send({
          success: false,
          message: "user session server error"
        });
      } else if (!userSession || userSession.isDead) {
        return res.send({
          success: false,
          message: "invalid token"
        });
      } else {
        Game.findOneAndUpdate(
          { _id: gameID, isOpen: true, user1: { $ne: username } },
          { $set: { user2: username, isOpen: false } },
          { new: true },
          (err, game) => {
            if (err) {
              return res.send({
                success: false,
                message: "game server error"
              });
            } else if (!game) {
              return res.send({
                success: false,
                message: "invalid game"
              });
            } else {
              return res.send({
                success: true,
                message: "joined game"
              });
            }
          }
        );
      }
    });
  });

  //updateFen
  //this route updates the game's FEN position for the board
  //request url -> updateFen
  //response -> {}
  app.put("/updateFen", (req, res) => {
    const { body } = req;
    const { fen, gameID } = body;

    Game.findByIdAndUpdate(
      gameID,

      { $set: { fen: fen } },
      { new: true },
      (err, game) => {
        if (err) {
          return res.send({
            success: false,
            message: "server error"
          });
        } else if (!game) {
          return res.send({
            success: false,
            message: "invalid game"
          });
        } else {
          game.whiteTurn = !game.whiteTurn;
          game.save((err, game) => {
            if (err) {
              return res.send({
                success: false,
                message: "server error"
              });
            }
            return res.send({
              success: true,
              message: "fen updated"
            });
          });
        }
      }
    );
  });

  //updateResult
  //this route updates the game's result and marks the game as finished
  //request url -> updateResult
  //response -> {}
  app.put("/updateResult", (req, res) => {
    const { body } = req;
    const { winner, gameID } = body;

    Game.findByIdAndUpdate(
      gameID,
      { $set: { result: winner, isDone: true } },
      { new: true },
      (err, game) => {
        if (err) {
          return res.send({
            success: false,
            message: "server error"
          });
        } else if (!game) {
          return res.send({
            success: false,
            message: "invalid game"
          });
        } else {
          return res.send({
            success: true,
            message: "result updated"
          });
        }
      }
    );
  });
};
