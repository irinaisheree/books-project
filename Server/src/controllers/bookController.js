const router = require("express").Router()
const bookManager = require("../managers/bookManager")


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
    res.status(405).json({ error: 'GET method not allowed for this endpoint - register' });
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

router.get('/add', async (req, res) => {
    try {
        const book = await bookManager.getAll();
        console.log(book)
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/add', async (req, res) => {
    console.log(req.body)
    const book = {
     ...req.body,
  
    }
 
    try{
     await bookManager.create(book)
     res.redirect('/')
    }catch(err){
     console.log(err.message)
     res.redirect('/add')
    }
 })
 

module.exports = router