const mongoose = require("mongoose");
require("dotenv").config();

function dbConnection() {
  const DB_URL = process.env.MONGO_URL;
  //console.log(DB_URL);
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind("console", "connection Error"));
  db.on("open", function () {
    console.log("Database Connected !!");
  });
}

module.exports = dbConnection;
