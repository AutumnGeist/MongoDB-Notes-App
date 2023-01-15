const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: String,
    note: String,
    color: String,
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = mongoose.model("Note", noteSchema)