const Book = require('../models/Book')

exports.getAll = () => Book.find()

exports.getOne = (bookId) => Book.findById(bookId)


// exports.add =  (bookData) => {
//     const addedBook = Book.create({
//         ...bookData
//     })
    
//     return addedBook
// }


exports.create =  (bookData) => Book.create(bookData)