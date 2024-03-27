const router = require("express").Router()
const { getErrorMessage } = require('../utils/errorUtils')
const userManager = require('../managers/userManager')
const { isGuest, isAuth } = require('../middlewares/authMiddleware')
const User = require('../models/User')
const bookManager = require('../managers/bookManager')
const { ok } = require("assert")



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
        console.log(req.body)
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

// router.get('/:userId', async (req, res) => {
//     const userId = req.params.userId;
//     console.log('Requested user ID:', userId);
//     try {
//         const currentUser = await userManager.getOne(userId); 
//         console.log(currentUser);
//         if (!currentUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         return res.json(currentUser);
//     } catch (error) {
//         console.error('Error fetching one user:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });




module.exports = router