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
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],      
        trim: true
    },
    password:{
        type: String,
        required: [true, 'must provide a name'],
        trim: true
    },
    roles:{
        User:{
            type: Number,
            default:1993
        },
        Admin:{
            type:Number,
            default:1989
        },
        Editor:{
            type:Number,
            default:1991
        }
    },
    refreshToken:String
},{timestamps: true})

module.exports = mongoose.model('Auth', AuthSchema)