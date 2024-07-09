const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,},
    password: { type: String, required: true },
    level: { type: Number, required: true }
})

userSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 })

const User = mongoose.model('User', userSchema)

module.exports = User
