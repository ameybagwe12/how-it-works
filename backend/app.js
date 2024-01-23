const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Steps = require("./model/Step.js");

mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(Steps);

mongoose
  .connect("mongodb://localhost:27017/howItWorks")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.listen("5000", () => {
  console.log("Listening on Port 5000");
});
