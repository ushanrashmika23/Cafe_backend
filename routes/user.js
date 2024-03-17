const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const user = require("./../models/user.model");

const router = express.Router();

function Now() {
  const today = new Date();
  const date = today.toLocaleDateString();
  const time = today.toLocaleTimeString("en-US", { hour12: false });
  return { date, time };
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

//Reg User
router.route("/reg").post(upload.single('photo'), (req, res) => {
  const { username, email, password, propic } = req.body;
  const time = Now().time;
  const date = Now().date;
  const userData = { username, email, password, propic, date, time };
  const newUser= new user(userData);

  newUser.save().then(()=>{res.json("User Added")}).catch((err)=>{res.json(err)})

//   res.send(user);
});

module.exports = router;
