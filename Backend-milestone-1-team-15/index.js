//const mongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const { app } = require("./app");
require("dotenv").config();

const connection = mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected yaaay"));

app.listen(process.env.PORT);
