const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')
const { set } = require('../../src/app')

const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id : userOneID,
    name : "Mike",
    email : "wack@example.com",
    password : "56what!!",
    tokens : [{
        token : jwt.sign({ _id : userOneID} , process.env.JWT_SECRET)
    }]
}

const userTwoID = new mongoose.Types.ObjectId()
const userTwo = {
    _id : userTwoID,
    name : "Mike",
    email : "mike@example.com",
    password : "56what!!",
    tokens : [{
        token : jwt.sign({ _id : userTwoID} , process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id : new mongoose.Types.ObjectId(),
    description : 'First Task',
    completed: false,
    userID : userOneID
}

const taskTwo = {
    _id : new mongoose.Types.ObjectId(),
    description : 'Second Task',
    completed: true,
    userID : userOneID
}

const taskThree = {
    _id : new mongoose.Types.ObjectId(),
    description : 'Third Task',
    completed: true,
    userID : userTwoID
}

const configureDB = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()    
}

module.exports = {
    userOneID,
    userOne,
    userTwoID,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    configureDB
}