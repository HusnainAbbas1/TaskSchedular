const mongoose = require('mongoose');

const createTaskSchema = new mongoose.Schema({

    taskName:{
        type:String,
        required:[true]
    },
    taskDescription:{
        type:String,
        required:[true]
    },
    taskDate:{
        type:Date,
        required:[true]

    }

});

const  createTask = mongoose.model('creatTask',createTaskSchema);
module.exports = createTask; 

