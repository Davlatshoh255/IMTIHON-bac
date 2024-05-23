const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true    },
    author: {
        type: String,
        require: true
    },
    isbn:{
        type:String,
        require:true
    },
    publication_year:{
        type:Number,
        require:true
    },
    copies_available:{
        type:Number,
        require:true
    }
})


const Book = mongoose.model("book", bookSchema)
module.exports = Book
