const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');
const Book = require('../models/User')

exports.register = async (userData) => {


   const email = await User.findOne({email: userData.email}) 
   if(email){
    throw new Error("Email already exists")
   }

   return User.create(userData)
};

exports.login = async (email, password) => {
    // Get user from db
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
        throw new Error('Cannot find email or password');
    }

    // Check if password is valid
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Cannot find email or password');
    }

    // Generate jwt token
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '24h' });

    // return token
    return token;
}

exports.getOneUser = (userId) => {
    return User.findById(userId)
      .populate({
        path: 'likedBooks',
        select: '_id title author price imageUrl description',
      })
      .exec();
  };
  exports.likeBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the book is already liked
        if (user.likedBooks.includes(bookId)) {
            return res.status(400).json({ error: 'Book already liked' });
        }

        // Add the book to the likedBooks array
        user.likedBooks.push(bookId);
        await user.save();

        return res.status(200).json({ message: 'Book liked successfully' });
    } catch (error) {
        console.error('Error liking book:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};