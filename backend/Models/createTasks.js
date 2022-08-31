const mongoose = require('mongoose');

const createTaskSchema = new mongoose.Schema({

    assigneeId:{
        type:String
    },

    taskName:{
        type:String,
        // required:[true]
    },
    leadId:{
        type:String
    },
    assignTo:{
       type:String,
    //    required:[true]
    },
    taskDescription:{
        type:String,
        // required:[true]
    },
    // taskDate:{
    //     type:String,
    //     // required:[true]

    // },
    projectName:{
        type:String
    },
    taskStatus:{
        type:Boolean,
      
    }
},{ timestamps: true });

const  createTask = mongoose.model('creatTask',createTaskSchema);
module.exports = createTask; 

