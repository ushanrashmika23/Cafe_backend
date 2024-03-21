const express = require("express");
const dateTime = require("../functions/dateTime");
const axios = require("axios");
const router = express.Router();
const order = require("../models/order.model");

router.route("/new").post((req, res) => {
  const date = dateTime().date;
  const time = dateTime().time;
  const { productId, quantity, unitPrice } = req.body;

  if (!req.session.user) {
    res.status(200).send({ status: "LoginFirst" });
  } else {
    const username = req.session.user.username;
    const { productId, quantity, unitPrice } = req.body;
    const totalPrice = quantity * unitPrice;
    const orderData = {
      username,
      productId,
      quantity,
      unitPrice,
      totalPrice,
      date,
      time,
      status: "Pending",
    }; //pending , making , delivered
    const newOrder = new order(orderData);

    newOrder
      .save()
      .then((newOrder) => {
        res.status(200).send({ status: "OrderAdded", data: newOrder });
      })
      .catch((err) => {
        res.status(500).send({ status: "OrderAddError", error: err });
      });
  }
});

router.route("/getAll").get((req, res) => {
  order
    .find()
    .then((order) => {
      res.status(200).send({ status: "FetchingSuccess", orders: order });
    })
    .catch((err) => {
      res.status(500).send({ status: "FetchingErr", error: err });
    });
});

router.route("/del/:status/:id").delete((req, res) => {
  if (req.params.status == "pending") {
    order
      .findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).send({ status: "Order Deleted" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Order Delete Error", error: err });
      });
  }else{
    res.status(200).send({ status: "Order Delivered! Can't Delete order" });
  }
});

module.exports = router;
