const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.register = async (userData) => {


    const email = await User.findOne({email: userData.email}) 
    if(email){
     throw new Error("Email already exists")
    }
 
    return User.create(userData)
 };

exports.login = async (email, password) => {
    // Get user from db
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
        throw new Error('Cannot find email or password');
    }

    // Check if password is valid
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Cannot find email or password');
    }

    // Generate jwt token
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '4h' });

    // return token
    return token;
}
exports.getUsers = () => User.find()