const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const userSchema = mongoose.model('User', LoginSchema);
module.exports = userSchema

