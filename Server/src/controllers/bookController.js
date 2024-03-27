const router = require("express").Router()
const bookManager = require("../managers/bookManager")
const {isAuth, isOwner} = require('../middlewares/authMiddleware')


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

module.exports = router