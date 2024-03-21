const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(session({ secret: "684jhvg^$85" }));

const PORT = process.env.PORT || 7080;

app.use(cors());
app.use(bodyParser.json());

//dbConnection

mongoose.connect(
  "mongodb+srv://ushanrashmikacp:iI6Gambh4j46qApk@cluster0.kgaxehn.mongodb.net/ST_MAN_DB?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection successfull...");
});

// if "url/user" then redirect to routes/user.js
const userRouter = require("./routes/userRoute.js");
app.use("/user", userRouter);

const productRouter = require("./routes/productRouter.js");
app.use("/product", productRouter);

const favProductRouter = require("./routes/favProductRouter.js");
app.use("/favProduct", favProductRouter);

const orderRouter = require("./routes/orderRouter.js");
app.use("/order", orderRouter);

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port :${PORT}`);
});
