// Create a basic express server
// =============================================================
var express = require("express");
var app = express();
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection to Database is successful");
  })
  .catch((err) => {
    console.log("Unable to Connect to Database", err);
  });

const PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
