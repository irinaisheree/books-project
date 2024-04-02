const router = require("express").Router()
const bookManager = require("../managers/bookManager")
const {isAuth, isOwner} = require('../middlewares/authMiddleware');
const Book = require("../models/Book");
const User = require('../models/User')
const userManager = require("../managers/userManager")


router.get('/books', async (req, res) => {
    try {
        const allBooks = await bookManager.getAll();
        console.log(allBooks)
        res.json(allBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/add', (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - add' });
});



router.get('/books/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    console.log('Requested book ID:', bookId);
    try {
        const oneBook = await bookManager.getOne(bookId); 
        console.log(oneBook);
        if (!oneBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.json(oneBook);
    } catch (error) {
        console.error('Error fetching one book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/add', isAuth, async (req, res) => {
    console.log(req.body);
    const bookData = req.body;

    try {
        const newBook = await bookManager.create(bookData, req.user._id);
        console.log(newBook);
        res.json(newBook);
    } catch (error) {
        console.error('Error adding book:', error.message);
        res.status(500).json({ error: 'Failed to add book' });
    }
});

router.get('/books/:bookId/edit', isAuth, async (req, res) => {
    try {
      const bookId = req.params.bookId;
      // Here you can fetch the book data by bookId from your database
      // For now, let's assume you have a book object
      const book = await bookManager.getOneWithDetails(bookId);
      
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      
      res.status(200).json(book);
    } catch (error) {
      console.error('Error fetching book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.post('/books/:bookId/edit', isAuth, isOwner, async (req, res) => {
    const bookId = req.params.bookId;
    const bookData = req.body;
    
    try {
      // Update the book data in your database using bookId and bookData
      // For now, let's assume the book is updated successfully
      const updatedBook = await bookManager.update(bookId, bookData);
      
      res.status(200).json(updatedBook);
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.delete('/books/:bookId/delete', async (req, res) => {
    try {
      const bookId = req.params.bookId; // Corrected parameter name
      // Check if the book exists
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      await Book.findByIdAndDelete(bookId);
      return res.status(204).send(); // No content
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
 

  router.post('/books/:bookId/like', isAuth, async (req, res) => {
    const { bookId } = req.params;
    
    // Check if user ID is available in the request
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { _id: userId } = req.user;
    
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    
      if (user.likedBooks.includes(bookId)) {
        return res.status(400).json({ error: 'Book already liked' });
      }
    
      user.likedBooks.push(bookId);
      await user.save();
    
      console.log('Book liked successfully');
      console.log('Updated user:', user); // Log the updated user
    
      res.status(200).json({ message: 'Book liked successfully', user });
    } catch (error) {
      console.error('Error liking book:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/:userId/liked/:bookId', isAuth, async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming 'likedBooks' is an array field in your User model
    if (!user.likedBooks.includes(bookId)) {
      user.likedBooks.push(bookId);
      await user.save();
      res.status(200).json({ message: 'Book liked successfully' });
    } else {
      res.status(400).json({ message: 'Book already liked by the user' });
    }
  } catch (error) {
    console.error('Error liking book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
  

router.post('/:bookId/like', isAuth, userManager.likeBook);

  
module.exports = router