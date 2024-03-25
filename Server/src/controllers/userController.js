const userRouter = require("express").Router()
const { getErrorMessage } = require('../utils/errorUtils')
const userManager = require('../managers/userManager')
const { isGuest, isAuth } = require('../middlewares/authMiddleware')
const User = require("../models/User")
const express = require('express')



userRouter.use(express.json());


userRouter.get('/register', (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - register' });
});

userRouter.post('/register', async (req, res) => {
    try {
        const user = await userManager.register(req.body);
        console.log(user)
        res.json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


userRouter.get('/login', (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - register' });
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userManager.login(email, password);
        res.json({ token });
    } catch (error) {
        console.error('Error logging user:', error);
        res.status(401).json({ error: 'Invalid email or password' });
    }
});

userRouter.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = userRouter