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

// Middleware checkt header content-type
router.post("/", (req, res, next) => {
    if (req.header("Content-Type") === "application/json") {
        next();
    } else {
        res.status(415).send();
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

// // Create Route /
// router.delete("/", (req, res) => {
//     console.log("DELETE");
//     res.send("Hello Express!!!");
// })
//

router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.send();
})

module.exports = router;