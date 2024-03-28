const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Book = require('./Book');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    createdBooks: [{
        type: mongoose.Types.ObjectId,
        ref: Book,
    }],
    likedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Book,
    }],
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hash = await bcrypt.hash(this.password, 12);
        this.password = hash;
    }
    next();
});

// Virtual for password confirmation during registration
userSchema.virtual('repeatPassword')
    .get(function () {
        return this._repeatPassword;
    })
    .set(function (value) {
        this._repeatPassword = value;
    });

// Validate repeatPassword only during registration
userSchema.pre('validate', function (next) {
    if (this.isNew && !this._repeatPassword) {
        this.invalidate('repeatPassword', 'Password confirmation is required.');
    }
    if (this.isNew && this.password !== this._repeatPassword) {
        this.invalidate('repeatPassword', 'The passwords should be matching.');
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
