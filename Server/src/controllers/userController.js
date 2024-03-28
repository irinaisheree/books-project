const router = require("express").Router();
const { getErrorMessage } = require('../utils/errorUtils');
const userManager = require('../managers/userManager');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');
const User = require('../models/User');
const bookManager = require('../managers/bookManager');
const Book = require('../models/Book'); // Add this line

router.get('/register', (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - register' });
});

router.post('/register', isGuest, async (req, res) => {
    try {
        const user = await userManager.register(req.body);
        res.json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/login', isGuest, (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - login' });
});

router.post('/login', isGuest, async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const token = await userManager.login(email, password);
        res.json({ token });
    } catch (error) {
        console.error('Error logging user:', error);
        res.status(401).json({ error: 'Invalid email or password' });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.status(200).clearCookie('token').send();
});

router.post('/:bookId/like', isAuth, userManager.likeBook);

module.exports = router;
