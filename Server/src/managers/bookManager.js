const Book = require('../models/Book')

exports.getAll = () => Book.find()

exports.getOne = (bookId) => Book.findById(bookId)


exports.create =  (bookData) => Book.create(bookData)