const mongoose = require('mongoose')

const User = mongoose.model('User', {
    id: Number,
    name: String,
    email: String,
    password: String,
    level: Number
})

module.exports = User