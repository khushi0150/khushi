const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email'], // Email validation
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    avatar: {
        url: {
            type: String,
            required: [true, 'avatar.url is required'],
        },
        public_id: {
            type: String,
            required: [true, 'avatar.public_id is required'],
        },
    },
    resetpasswordToken: String,
    resetpasswordExpire: Date, // Fixed typo
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
    next();
});

// JWT token generation method
userSchema.methods.generateToken = function () {
    const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key'; // Use environment variable or default
    const JWT_EXPIRE = '5d'; // You can customize the expiration as needed

    return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
};

// Generating Password Reset Password Token 

const crypto=require('crypto');

userSchema.method.getResetPassword=function(){
//Generating Token

const resetToken=crypto.rendomBytes(20).toString("hex");

//Hashing and adding resetpasswordtoken to userSchema

this.resetpasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
this.resetpasswordExpire=Date.now()+ 15*60*1000;
return resetToken;




}



   

// Create the model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
