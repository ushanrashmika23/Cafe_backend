const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const product = require("../models/product.model");
const dateTime = require("../functions/dateTime");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/productpic/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("propic");

//Reg User
router.route("/add").post(upload, (req, res) => {
  const propic = req.file.filename;
  const { name, price, ratings, about } = req.body;
  const time = dateTime().time;
  const date = dateTime().date;
  const proData = { name, price, propic, ratings, about, date, time };
  const newProduct = new product(proData);

  newProduct
    .save()
    .then(() => {
      res.status(200).send({ status: "Product Added" });
    })
    .catch((err) => {
      res.status(500).send({ status: "Product Add Error", error: err });
    });
});

//Update User
router.route("/update/:id").put(upload, (req, res) => {
  const propic = req.file.filename;
  const { name, price, ratings, about } = req.body;
  const time = dateTime().time;
  const date = dateTime().date;
  const newData = { name, price, propic, ratings, about, date, time };

  const update = product
    .findByIdAndUpdate(req.params.id, newData)
    .then(() => {
      res.status(200).send({ status: "Product Updated" });
    })
    .catch((err) => {
      res.status(500).send({ status: "Product Update Error", error: err });
    });
});

//Delete User
router.route("/del/:id").delete((req, res) => {
  product
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ status: "Product Deleted" });
    })
    .catch((err) => {
      res.status(500).send({ status: "Product Delete Error", error: err });
    });
});

//Show All
router.route("/getAll").get((req, res) => {
  product
    .find()
    .then((product) => {
      res.status(200).send({ status: "Fetching Success", product: product });
    })
    .catch((err) => {
      res.status(500).send({ status: "Fetching Err", error: err });
    });
});

//Show specipic user
router.route("/get/:id").get((req, res) => {
  product
    .findById(req.params.id)
    .then((product) => {
      res.status(400).send({ status: "FetchingSuccess", product:product });
    })
    .catch((err) => {
      res.status(500).send({ Status: "FetchingErr", error: err });
    });
});


module.exports = router;
