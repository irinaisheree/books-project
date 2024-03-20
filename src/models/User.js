const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    
    email : {
        type: String,

    },
    password: {
        type: String,
   
        
    },
});

userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 12)
    this.password = hash;
 });
 
 userSchema.virtual('repeatPassword')
     .get(function() {
       return this._repeatPassword;
     })
     .set(function(value) {
         this._repeatPassword = value;
     });
 
 userSchema.pre('validate', function(next) {
     if (this.password !== this._repeatPassword) {
         this.invalidate('repeatPassword', 'The passwords should be matching.');
     }
     next();
 });

const User = mongoose.model('User', userSchema)

module.exports = User