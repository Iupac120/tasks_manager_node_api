const Task = require('../models/Task')
const {createCustomError} = require('../errors/customError')

const getAllTask = async(req,res) =>{
    try{
        const tasks = await Task.find({})
        res.status(200).json({succes: true, nbHits: tasks.length, data:{tasks}})
    }catch(err){
        res.status(500).json({msg: err})
    }
}
const getTask = async(req, res, next) =>{
    try{
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if (!task){
            console.log('error')
            return next(createCustomError(`No task with id: ${taskID}`,404))
            const error = new Error('Not found')
            error.status = 404
            return next(error)
            return res.status(404).json({msg: `No task with id: ${id}`})
        }
        res.status(200).json({task})
    }catch(err){
        res.status(500).json({msg: err})
    }
}
const createTask = async(req, res) =>{
        try{
            console.log('task')
            const task = await Task.create(req.body)
            res.status(201).json({task})
        }catch(err){
            res.status(500).json({msg:err})
        }
}
const updateTask = async(req, res) =>{
    try{
        const {id: taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body,{
            new: true,
            runValidators: true,
        })
        res.status(200).json({id:taskID, data:task})
        if (!taskID){
            return res.status(404).json({msg:`No task with id: ${taskID}`})
        }
    }catch(err){
        res.status(500).json({msg:err})
    }
}
const deleteTask = async(req, res) =>{
    try{
        const {id: taskID} = req.params
    const task = await Task.findOneAndDelete({_id: taskID})
    res.status(200).json({msg:`Task with ${taskID} has been deleted`})
    if (!task){
        return res.status(404).json({msg:`No task with id:${taskID}`})
    }
    }catch(err){
        res.status(500).json({msg:err})
    }
}
module.exports = {getAllTask, getTask, createTask, updateTask, deleteTask}