var express = require("express")
var router = express.Router()

let Note = require("./models/Note")

//index page route
router.get("/", function(req, res) {
    res.render("index")
})

//addNote page routes
router.get("/addNote", function(req, res) {
    res.render("addNote")
})

router.post("/addNote", async function(req, res) {
    console.log(req.body)
    // create new note from the request body
    let note = new Note({
        title: req.body.title,
        note: req.body.note,
        color: req.body.color
    })
    // use async promise to save to the DB
    try{
        let newNote = await note.save()       
        console.log("Note saved successfully")
        res.redirect('getNotes')
    }catch (err) {
        res.status(400).json({message: err.message})
    }

})

//getAll notes routes
router.get("/getNotes", async function(req, res) {
    //find all notes from Mongoose DB
    try {
		const notes = await Note.find({})
		res.render("getNotes", {notes})
	}catch (err) {
		console.log(err)
		res.status(500).send("No data found")
	}
})

router.delete("/getNotes/:id", async (req, res) => {
    console.log("Delete Request " + req.params.id)
    try {
        let note = await Note.findByIdAndDelete(req.params.id)
        console.log("Delete Successful")
        res.redirect("/getNotes")
    } catch (error) {
        console.log(error)
    }
})

// renders the editNote page, finds and passes the specified note by ID
router.get("/editNote/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        res.render("editNote", {note})
    } catch (error) {
        res.redirect('/getNotes')
    } 
})

//editNote page, update a specified note 
router.put("/editNote/:id", async (req, res) => {
    console.log(req.body)
    try{
        let note = await Note.findById(req.params.id)
        note.title = req.body.title
        note.note = req.body.note
        note.color = req.body.color
        await note.save()       
        console.log("Note updated successfully")
        res.redirect('/getNotes')
    }catch (err) {
        console.log(err)
    }

})

module.exports = router

