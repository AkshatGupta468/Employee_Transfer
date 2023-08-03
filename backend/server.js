// Create a basic express server
// =============================================================
var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT)
})
