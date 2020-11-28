const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task= require('../../src/models/task')

const userId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userId,
    name: 'Prithviraj',
    email: 'example@example.com',
    password: '12345678',
    tokens: [{
        token: jwt.sign({ _id: userId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Viren',
    email: 'viren@example.com',
    password: '123456789',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne={
    _id:new mongoose.Types.ObjectId(),
    description:"task One",
    completed:true,
    owner:userId
}

const taskTwo={
    _id:new mongoose.Types.ObjectId(),
    description:"task Two",
    completed:true,
    owner:userId
}

const taskThree={
    _id:new mongoose.Types.ObjectId(),
    description:"task Three",
    completed:true,
    owner:userTwoId
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

const closeDatabase = async () => {
    await mongoose.connection.close()
}

module.exports = {
    userId,
    userTwoId,
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase,
    closeDatabase
}