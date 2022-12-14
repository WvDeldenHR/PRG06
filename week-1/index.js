const express = require("express");

// Create Webserver
const app = express();

// Create Route /
app.get("/", (req, res) => {
    res.send("Hello Express");
})

// Start Webserver on Port 8000
app.listen(8000, () => {
    console.log("Express Started");
})