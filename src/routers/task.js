
const Task=require('../models/task')
const express=require('express')
const auth=require('../middlewares/auth')
const taskrouter=new express.Router()

taskrouter.post('/tasks',auth, async (req, res) => {
    
    const task=new Task({
        ...req.body,
        owner:req.user._id
    })
    try {
        const tsk = await task.save()
        res.status(201).send(tsk)
    } catch (e) {
        res.status(400).send(e)
    }
})


// GET /tasks?completed=true   --> filtering out search results according to task is completd or not
// GET /tasks?limit=10&skip=10  --> Give 10 pages only by skipping first 10 pages
// GET /tasks?sortBy=createdAt_asc 
taskrouter.get('/tasks',auth ,async (req, res) => {
    const match={}
    const sort={}
    if(req.query.sortBy){
        const parts=req.query.sortBy.split('_')
        sort[parts[0]]=parts[1]==='desc'?-1:1
    }
    if(req.query.completed){
        match.completed=req.query.completed==='true'
    }
    try {
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

taskrouter.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id,owner:req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})



taskrouter.patch('/tasks/:id',auth,async (req,res)=>{
    const givenParams=Object.keys(req.body)
    const updateParams=['description','completed']
    const isValid=givenParams.every((param)=>updateParams.includes(param))
    if(!isValid){
        return res.status(400).send({error:'invalid updates !'})
    }
    try {
        const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
       
        givenParams.forEach((param)=>task[param]=req.body[param])
        await task.save()

        if(!task){
            res.status(400).send()
        }
        else{
            res.send(task)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

taskrouter.delete('/tasks/:id',auth,async (req,res)=>{
    try{
        const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports=taskrouter