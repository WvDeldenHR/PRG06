const express = require("express");
const bodyParser = require("body-parser");

// Load environment variables
require('dotenv').config()

// test
console.log(process.env.BASE_URI);

// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/notes";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Create Webserver
const app = express();

// Use bodyparser to parse x-form-www-urlencoded

const notesRouter = require("./routers/notesRouter");

// Create Route /
app.use("/notes/", notesRouter)

// Start Webserver on Port 8000
app.listen(8000, () => {
    console.log("Express Started");
})