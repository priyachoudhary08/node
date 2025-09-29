const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    jobTitle: {
        type: String
    }
}, { timestamps: true })

const User = mongoose.model('user', userSchema);

module.exports =User