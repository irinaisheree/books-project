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
  exports.likeBook = async (userId, bookId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        console.error('User not found');
        return { error: 'User not found', status: 404 };
      }
  
      console.log('Current likedBooks:', user.likedBooks);
  
      // Check if the book is already liked
      if (user.likedBooks.includes(bookId)) {
        console.error('Book already liked');
        return { error: 'Book already liked', status: 400 };
      }
  
      // Add the book to the likedBooks array
      user.likedBooks.push(bookId);
      await user.save();
  
      console.log('Updated likedBooks:', user.likedBooks);
  
      return { message: 'Book liked successfully', user };
    } catch (error) {
      console.error('Error liking book:', error);
      return { error: 'Internal server error', status: 500 };
    }
  };


exports.getUserProfile = (userId) => User.findById(userId).populate('createdBooks').populate('likedBooks')