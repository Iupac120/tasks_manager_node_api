const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [20, 'name must no be more than 20']
    },
    price:{
        type: Number,
        required: [true, 'price must be provided']
    },
    featured:{
        type:Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    company:{
        type: String,
        enum:{
            values:  ['ikea','liddy','caressa','marcos'],
            message: '{VALUE} not supported'
        }
        //enum: ['ikea','liddy','caressa','marcos']
    } 
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', ProductSchema)