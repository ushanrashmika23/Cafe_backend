const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  productID: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const favProduct = mongoose.model("favProduct", userSchema);
module.exports = favProduct;
