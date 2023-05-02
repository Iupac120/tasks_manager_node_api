const mongoose = require('mongoose')
const jobSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'provide job name']
    },
    position:{
        type: String,
        required: [true, 'Please select position']
    },
    status:{
        type: String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'Auth',
        required:[true,'Please provide user']
    }
},{timestamps: true})

module.exports = mongoose.model('Job',jobSchema)