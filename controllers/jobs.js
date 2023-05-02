const Job = require('../models/Job')
const Jobs = require('../models/Job')
const {createCustomError} = require('../errors/customError')

const getAllJobs = async(req,res) => {
    try{
        const job = await Job.find({createdBy: req.user.id}).sort('createdAt')
        res.status(200).json({job,count:job.length})
    }catch(err){
        res.status(500).json('server error')
    }
}
const getJob = async(req,res, next) => {
    try{
        const {user:{id},params:{jobID}} = req
        const job = await Job.findOne({_id:jobID, createdBy:id})
        if (!job){
            return next(createCustomError(`Job with id:${jobID} not found`,401))
        }
        res.status(200).json({"mesaage":'job has been created'})
    }catch(err){
        res.status(500).json('server error')
    }
    }
const createJobs = async(req,res) => {
    try{
        req.body.created = req.user.id
        const job = await Job.create({...req.body})
        res.status(200).json({job})
    }catch(err){
        res.status(500).json('server erro')
    }
}
const updateJobs = async(req,res, next) => {
    try{
        const {
        body:{name,position},
        user:{id},
        params:{jobID}
    } = req  
    if (!name || !position){
        return next(createCustomError('Please provide name and position',401))
    }
    const job = await Job.findByIdAndUpdate({_id:jobID, createdBy:id},req.body,{
        new:true,
        runValidators: true
    })
    if (!job){
        return next(createCustomError(`Job with id:${jobID} not found`,401))
    }
    res.status(200).json({job})
    }catch(err){
        res.status(500).json('server error')
    }
}
const deleteJobs = async(req,res,next) => {
    try{
        const {user:{id},params:{jobID}} = req
        const job = await Job.findByIdAndRemove({_id:jobID, createdBy:id})
        if (!job){
            return next(createCustomError(`Job with id:${jobID} not found`,401))
        }
        res.status(200).json({"mesaage":`job with id :${jobID} been created`})  
    } catch(err){
        res.status(500).json('server error')
    }
}


module.exports = {
    getAllJobs,
    getJob,
    createJobs,
    updateJobs,
    deleteJobs
}