// Notes Router
const express = require("express");

const router = express.Router();

const Note = require("../models/notesModel");


// Create Route /
router.get("/", async (req, res) => {
    console.log("GET");
    try {
        let notes = await Note.find();
        res.json(notes);
    } catch {
        res.status(500).send()
    }
})

// Create Route for Detail
router.get("/:id", (req, res) => {
    // find(_id)
    console.log("GET");
    res.send(`request for item ${req.params.id}`);
})

// Create Route /
router.post("/", async (req, res) => {
    console.log("POST");

    // Deze info moet uit request komen
    let note = new Note({
        title: "test1",
        body: "test1",
        author: "test1"
    })

    try {
        await note.save();

        res.json(note);
    } catch {
        res.status(500).send()
    }
})

// Create Route /
router.delete("/", (req, res) => {
    console.log("DELETE");
    res.send("Hello Express!!!");
})

// Create Route /
router.options("/", (req, res) => {
    console.log("OPTIONS");
    res.send("Hello Express!!!");
})

module.exports = router;