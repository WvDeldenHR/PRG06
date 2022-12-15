const express = require("express");

const Note = require("../models/notesModel");

// Create Router
const router = express.Router();

// Add routes for all end points

// Collection: GET /
router.get("/", async (req, res) => {
    console.log(`GET request for collection /`);
    try {
        let notes = await Note.find();

        // Create representation for collection as requested in assignment
        // items, _links, pagination

        let notesCollection = {
            items: notes,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}notes/`
                }
            },
            pagination: "Zet er nu iets in"
        }

        res.json(notesCollection);
    } catch {
        // no response from db
        res.status(505).send();
    }
})

// Detail: GET /id
router.get("/:id", async (req, res) => {
    console.log(`GET request for detail ${req.params.id}`);

    try {
        let note = await Note.findById(req.params.id);
        if (note == null) {
            res.status(404).send();
        } else {
            res.json(note);
        }
    } catch {
        // id not found, send 404
        res.status(404).send();
    }
})

// Use middleware to check headers for POST
router.post("/", (req, res, next) => {
    console.log("POST middleware to check Content-Type")
    if (req.header("Content-Type") === "application/json") {
        next();
    } else {
        res.status(400).send();
    }
});

// Add middleware to disallow empty values
router.post("/", (req, res, next) => {
    console.log("POST middleware to check empty values")

    if (req.body.title && req.body.body && req.body.title) {
        next();
    } else {
        res.status(400).send();
    }
});

// Add resource to collection: POST/
router.post("/", async (req, res) => {
    console.log("POST request for collection/");

    let note = Note({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    })

    try {
        await note.save();
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
})

router.options("/", (req, res) => {
    console.log(`OPTIONS request for collection /`);
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.send();
})

router.options("/:id", (req, res) => {
    console.log(`OPTIONS request for detail ${req.params.id}`);
    res.set({
        'Allow': "GET, PUT, DELETE, OPTIONS"
    }).send();
})

// Detail: DELETE /id
router.delete("/:id", async (req, res) => {
    console.log(`DELETE request for detail ${req.params.id}`);

    try {
        let notes = await Note.findByIdAndDelete(req.params.id);

        res.status(204).send();
    } catch {
        // id not found, send 404
        res.status(404).send();
    }
})

// Export router
module.exports = router;