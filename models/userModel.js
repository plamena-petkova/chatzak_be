const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:3, 
        max:20,
        unique: true,
    },
    names: {
        type: String,
        required: true,
        min:10, 
        max:40,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        min:3, 
        max:20,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min:5, 
        max:20,
        unique: true,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImg: {
        type: String,
        default:''
    },
});

module.exports = mongoose.model('Users', userSchema);