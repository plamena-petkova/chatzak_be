const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, 'Username 5 characters long is required'],
        min:5, 
        max:20,
        unique: true,
    },
    names: {
        type: String,
        required:[true, 'Names min 10 characters long are required'],
        min:10, 
        max:40,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        min:6, 
        max:20,
        unique: true,
    },
    password: {
        type: String,
        required:  [true, 'Password min 5 characters long is required'],
        min:5, 
        max:20,
        unique: true,
    },
    avatarImg: {
        type: String,
        default:''
    },
});

module.exports = mongoose.model('Users', userSchema);