const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

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
const userRouter=require("./routes/user.js");
app.use("/user",userRouter);




//listen server
app.listen(PORT, () => {
  console.log(`Server running on port :${PORT}`);
});
