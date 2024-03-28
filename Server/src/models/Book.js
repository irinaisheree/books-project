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
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
})

exports.likeBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the bookId to the likedBooks array if it doesn't already exist
    if (!user.likedBooks.includes(bookId)) {
      user.likedBooks.push(bookId);
    }

    // Save the user with the updated likedBooks array
    await user.save();

    return res.status(200).json({ message: 'Book liked successfully' });
  } catch (error) {
    console.error('Error liking book:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




const Book = mongoose.model("Book", bookSchema)


module.exports = Book