const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  propic: {
    type: String,
    required: true,
  },
  ratings: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const product = mongoose.model("product", userSchema);
module.exports = product;
