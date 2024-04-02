const userRouter = require("express").Router();
const { getErrorMessage } = require('../utils/errorUtils');
const userManager = require('../managers/userManager');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');
const User = require('../models/User');
const bookManager = require('../managers/bookManager');
const Book = require('../models/Book'); // Add this line

userRouter.get('/register', (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - register' });
});

userRouter.post('/register', isGuest, async (req, res) => {
    try {
        const user = await userManager.register(req.body);
        res.json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRouter.get('/login', isGuest, (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - login' });
});

userRouter.post('/login', isGuest, async (req, res) => {
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

userRouter.get('/logout', isAuth, (req, res) => {
    res.status(200).clearCookie('token').send();
});



// userRouter.get('/profile', userManager.getUserProfile);
// userRouter.get('/:userId/profile', userManager.getUserProfile)
userRouter.get('/:userId/profile', async(req, res) => {
    const userId = req.params.userId
    console.log(userId)

   
    try {
        const currentUser = await userManager.getUserProfile(userId)
        console.log(currentUser);
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(currentUser);
    } catch (error) {
        console.error('Error fetching one user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = userRouter;