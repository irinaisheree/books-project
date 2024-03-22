const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  
    title: {
        type: String, 
        required: [true, "type is missing"],
    },
    author:{
        type: String, 
        required: true,
    },
    price: {
        type: Number, 
        required: true,
    },
    imageUrl: {
        type: String, 
        required: true,
        match: [/^https?:\/\//, 'Invalid poster link']
    },
    description: {
        type: String, 
        required: true,
        maxLength: [1000, 'Maximum characters exceeded - description cannot be longer than 1000 characters']
    },
    // likes: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: "Book"
    // }],
    // creator: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User"
    // },
})




const Book = mongoose.model("Book", bookSchema)


module.exports = Book