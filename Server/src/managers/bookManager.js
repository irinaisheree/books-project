const Book = require('../models/Book');
const User = require('../models/User');

exports.getAll = () => Book.find()

exports.getOne = (bookId) => Book.findById(bookId)


// exports.create =  (bookData) => Book.create(bookData)

exports.update = (bookId, bookData) => {
    return Book.findByIdAndUpdate(bookId, bookData);
  };

exports.getOneWithDetails = (bookId) => this.getOne(bookId).populate('creator')

exports.create = async (bookData, userId) => {
    try {
      const newBook = new Book({
        ...bookData,
        creator: userId // Convert userId to ObjectId
      });
  
      const savedBook = await newBook.save();
      await User.findByIdAndUpdate(userId, { $push: { createdBooks: savedBook._id } });
  
      return savedBook;
    } catch (error) {
      throw error;
    }
  };