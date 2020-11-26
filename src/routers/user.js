const express = require('express')
const User = require('../models/user')
const auth = require('../middlewares/auth')
const {sendWelcomeEmail,sendExitEmail}=require('../emails/account')
const multer=require('multer')
// sharp module for resizing and changing file format
const sharp=require('sharp')


const router = new express.Router()



router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        token = await user.authenticateUser();
        res.status(201).send({ user, token });
    }
    catch (e) {
        res.status(400).send(e)
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.authenticateUser();
        res.send({ user, token })
    }
    catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout',auth, async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>token.token!==req.token)
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


router.patch('/users/me', auth,async (req, res) => {
    const givenparams = Object.keys(req.body)
    const updateparams = ['name', 'email', 'age', 'password']
    const isValid = givenparams.every((param) => updateparams.includes(param))
    if (!isValid) {
        return res.status(400).send({ error: "invalid updates !" })
    }
    try {

        givenparams.forEach((param) => req.user[param] = req.body[param])

        await req.user.save()
        // const user=await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(req.user)

    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/users/me',auth, async (req, res) => {
    try {
        await req.user.remove()
        sendExitEmail(req.user.email,req.user.name)
        res.send(req.user)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

const upload=multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Incorrect file format'))
        }
        cb(undefined,true)
    }
})


router.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    // Whenever therre is any error in middlewares this method will run
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth,async (req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        // setting up response headers 'key','value'
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }
    catch(e){
        res.status(404).send()
    }
})

module.exports = router

