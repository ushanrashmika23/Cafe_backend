const express = require("express");
const multer = require("multer");
const session = require("express-session");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const user = require("../models/user.model");
const dateTime = require("../functions/dateTime");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/propic/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("propic");

//Reg User
router.route("/reg").post(upload, (req, res) => {
  const propic = req.file.filename;
  const { username, email, password } = req.body;
  const time = dateTime().time;
  const date = dateTime().date;
  const userData = { username, email, password, propic, date, time };
  const newUser = new user(userData);

  newUser
    .save()
    .then(() => {
      res.status(200).send({ status: "UserReaged" });
    })
    .catch((err) => {
      res.status(500).send({ status: "UserRegError", error: err });
    });
});

//Update User
router.route("/update/:id").put(upload, (req, res) => {
  const propic = req.file.filename;
  const { username, email, password } = req.body;
  const time = dateTime().time;
  const date = dateTime().date;
  const newData = { username, email, password, propic, date, time };

  const update = user
    .findByIdAndUpdate(req.params.id, newData)
    .then(() => {
      res.status(200).send({ status: "UserUpdated" });
    })
    .catch((err) => {
      res.status(500).send({ status: "UserUpdatError", error: err });
    });
});

//Delete User
router.route("/del/:id").delete((req, res) => {
  user
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ status: "UserDeleted" });
    })
    .catch((err) => {
      res.status(500).send({ status: "UserDeleteError", error: err });
    });
});

//Show All
router.route("/getAll").get((req, res) => {
  user
    .find()
    .then((user) => {
      res.status(200).send({ status: "FetchingSuccess", user: user });
    })
    .catch((err) => {
      res.status(500).send({ status: "FetchingErr", error: err });
    });
});

//Show specipic user
router.route("/get/:username").get((req, res) => {
  user
    .findOne({ username: req.params.username })
    .then((user) => {
      res.status(400).send({ status: "FetchingSuccess", user: user });
    })
    .catch((err) => {
      res.status(500).send({ Status: "FetchingErr", error: err });
    });
});

//Login
router.route("/login").post(async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  user
    .findOne({ username: username })
    .then((user) => {
      if (user.password === password) {
        let sessionData = req.session;
        sessionData.user = user;
        res
          .status(200)
          .send({
            status: "LoginSuccess",
            msg: "Login Success",
            user: user,
            session: sessionData,
          });
      } else {
        res.status(400).send({ status: "LoginError", msg: "Password Error" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ Status: "FetchingErr", msg: "User Not Found", error: err });
    });
});

module.exports = router;
