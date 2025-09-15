const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route:-1 Fetch all notes using: GET "/api/notes/fetchnotes" . Login required:-
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// Route:-2 Add notes using: POST "/api/notes/addnotes". Login required:-
router.post('/addnotes', fetchuser, [
    body("Title", "Enter a valid Title").isLength({ min: 3 }),
    body("Description", "Enter Description with minimum 8 character").isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // adding notes
    const { Title, Description, tag, user } = req.body;
    try {
        const note = await Notes.create({
            Title,
            Description,
            tag,
            user: req.user.id,
        });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// Route:-3 Updating existing notes using: PUT "/api/notes/updatenotes/:id". Login required:-
router.put('/updatenotes/:id', fetchuser, [
    body("Title", "Enter a valid Title").isLength({ min: 3 }),
    body("Description", "Enter Description with minimum 8 character").isLength({ min: 4 })
], async (req, res) => {
    const { Title, Description, tag, user } = req.body;
    try {
        const newNotes = {};
        if (Title) { newNotes.Title = Title };
        if (Description) { newNotes.Description = Description };
        if (tag) { newNotes.tag = tag };

        let notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send({ error: "Not found" });
        }
        // checking wheather the Notes is being edited by the onwer:-
        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send({ error: "Not Allowed. Access Denied" })
        }
        // updating notes:-
        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// Route:-4 Deleting existing notes using: DELETE "/api/notes/deletenotes/:id". Login required:-
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
        // finding notes to delete:-
        let notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send({ error: "Not found" });
        }
        // checking wheather the Notes is being edited by the onwer:-
        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send({ error: "Not Allowed. Access Denied" })
        }
        // Deleting notes:-
        notes = await Notes.findByIdAndDelete(req.params.id);
        res.send({ "success": "Deleted notes successfully", notes: notes });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// Route:-4 Fetching note using: GET "/api/notes/yournote/:id". Login required:-
router.get('/yournote/:id', fetchuser, async (req, res) =>  {
    try {
     let note = await Notes.findById(req.params.id);
     if(!note) {
        return res.status(404).send({ error: "Not found"});
     }
     // checking wheather the Notes is being edited by owner :-
     if(note.user.toString() !== req.user.id) {
        return res.status(401).send({error: "Note allowed. Access Denied"})
     }
     //fetching Note:-
     res.json(note);
    } catch {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router