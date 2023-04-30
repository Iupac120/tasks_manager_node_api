const mongoose = require('mongoose')

const AuthSchema = new mongoose.Schema({
    firsttname:{
        type: String,
        trim: true
    },
    lastname:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        required: [true, 'must provide a name'],
        trim: true
    },
    password:{
        type: String,
        required: [true, 'must provide a name'],
        trim: true
    }
},{timestamps: true})

module.exports = mongoose.model('Auth', AuthSchema)