const User = require("../models/User");
const UserSession = require("../models/UserSessions");

module.exports = app => {
  //newUser
  //this route posts a new user to the database
  //request url -> newUser
  //response -> {}
  app.post("/newUser", (req, res) => {
    const { body } = req;
    const { email, username, password } = body;

    if (!email) {
      return res.send({
        success: false,
        message: "error: blank email"
      });
    }
    if (!username) {
      return res.send({
        success: false,
        message: "error: blank username"
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "error: blank password"
      });
    }
    //Check if username is taken
    User.find({ username: username }, (err, previousUser) => {
      if (err) {
        return res.send({
          success: false,
          message: "server error"
        });
      } else if (previousUser.length > 0) {
        return res.send({
          success: false,
          message: "account already exists"
        });
      } else {
        //Create new user and store in db
        const newUser = new User();
        newUser.email = email;
        newUser.username = username;
        newUser.password = password;
        newUser.save((err, newUser) => {
          if (err) {
            return res.send({
              success: false,
              message: "error: failure"
            });
          } else {
            return res.send({
              success: true,
              message: "success"
            });
          }
        });
      }
    });
  });

  //login
  //this route checks login info
  //request url -> login
  //response -> {user: username, password}
  app.post("/login", (req, res) => {
    const { body } = req;
    const { username, password } = body;

    if (!username) {
      return res.send({
        success: false,
        message: "error: blank username"
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "error: blank password"
      });
    }

    //Check to see if user exists and if password matches
    User.findOne({ username: username }, (err, previousUser) => {
      if (err) {
        return res.send({
          success: false,
          message: "server error"
        });
      } else if (!previousUser) {
        return res.send({
          success: false,
          message: "account does not exist"
        });
      } else if (previousUser.password != password) {
        return res.send({
          success: false,
          message: "error: wrong password"
        });
      } else {
        //Create new userSession with user's ObjectId and UserID
        const newUserSession = new UserSession();
        newUserSession.userID = previousUser._id.toString();
        newUserSession.save((err, newUserSession) => {
          if (err) {
            return res.send({
              success: false,
              message: "server error"
            });
          } else {
            return res.send({
              success: true,
              message: "logged in",
              token: newUserSession._id
            });
          }
        });
      }
    });
  });

  //logout
  //this route logs the user out of their session
  //request url -> logout
  //response -> {}
  app.get("/logout", (req, res) => {
    const { query } = req;
    const { token } = query;
    const filter = { _id: token, isDead: false };
    const update = { $set: { isDead: true } };

    //Updates userSession to isDead
    UserSession.findOneAndUpdate(
      filter,
      update,
      null,
      (err, previousSession) => {
        if (err) {
          res.send({
            success: false,
            message: "server error"
          });
        } else if (!previousSession) {
          res.send({
            success: false,
            message: "invalid session"
          });
        } else {
          res.send({
            success: true,
            message: "logged out"
          });
        }
      }
    );
  });
};
