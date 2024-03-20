const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    price: {
        type: Number, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
        maxLength: [1000, 'Maximum characters exceeded - description cannot be longer than 1000 characters']
    },
    imageUrl: {
        type: String, 
        required: true,
        match: [/^https?:\/\//, 'Invalid poster link']
    },
    // likes: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: "Cast"
    // }],
    // creator: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User"
    // },
})




const Book = mongoose.model("Book", bookSchema)


module.exports = Book