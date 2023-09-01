const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const { query, body, validationResult } = require('express-validator');
const Note = require('../models/Note');

//route 1 get all the nites
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });

        res.json(notes);
    }

    catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
})

//add anew note using post 
router.post('/addnote', fetchuser, [
    body('title', 'enter valid title ').isLength({ min: 3 }),
    body('description', 'description musrt be long ').isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
})

//route 3 : update a note /api/notes/updatenote/:id
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;

    //create new note ka ovbject
    const newNote = {};
    if(title) {newNote.title = title};
    if(description) {newNote.description = description};
    if(tag) {newNote.tag = tag};

    //find note by id 
    let note = await Note.findById(req.params.id); 
    if(!note){return res.status(404).send("Not Found")}

    if(note.user && note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new: true});
    res.json({note});

});

    //route 4 delete note 
    router.delete('/deletenote/:id', fetchuser, async (req, res) => {
        const {title, description, tag} = req.body;
    
        //find note by id and delete 
        let note = await Note.findById(req.params.id); 
        if(!note){return res.status(404).send("Not Found")}
        
        //allow deletion 
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "success note has been deleted", note: note });
    
    });

module.exports = router