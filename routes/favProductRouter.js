const express = require("express");
const dateTime = require("../functions/dateTime");
const router = express.Router();
const favProduct = require("../models/favProduct.model");
const { route } = require("./userRoute");

router.route("/add/:productId").post((req, res) => {
  if (!req.session.user) {
    res.status(200).send({ status: "LoginFirst" });
  } else {
    let userId = req.session.user.username;
    const productID = req.params.productId;
    const date = dateTime().date;
    const newFavItem = new favProduct({ productID, userId, date });
    newFavItem
      .save()
      .then((newFavItem) => {
        res.status(200).send({ status: "FavItemAdded",data:newFavItem });
      })
      .catch((err) => {
        res.status(500).send({ status: "FavItemAddError", error: err });
      });
  }
});

router.route("/getAll").get((req, res) => {
  favProduct.find().then((favProduct)=>{
    res.status(200).send({ status: "FetchingSuccess",products: favProduct });
  })
})

router.route("/del/:id").delete((req, res) => {
  favProduct
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ status: "Product Deleted" });
    })
    .catch((err) => {
      res.status(500).send({ status: "Product Delete Error", error: err });
    });
})

module.exports = router;
