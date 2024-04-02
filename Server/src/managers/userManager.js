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


exports.getUserProfile = async (req, res) => {
    try {
      // Get the JWT token from the request headers
      const token = req.headers.authorization;
  
      // Check if token exists
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Extract the user ID from the token
      const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
      const userId = decoded.userId;
  
      // Find the user profile using the extracted user ID
      const userProfile = await User.findOne({ userId });
  
      // Check if userProfile exists
      if (!userProfile) {
        return res.status(404).json({ error: 'User profile not found' });
      }
  
      // Return the user profile
      res.status(200).json({ userProfile });
    } catch (error) {
      console.error(error);
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
      }
      res.status(500).json({ error: 'Server Error' });
    }
  };