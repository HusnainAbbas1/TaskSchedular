const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const ManagerChild = new mongoose.Schema({
    userName:{
        type:String,
        required:[true]
    },
    role:{
        type:String,
        required:[true]
    },
    currentProject:{
        type:String,
       
    },
    // skills:[],
    projectDescription:{
        type:String,
      
    },
    leadId:{
        type:String,
        required:[true]  
    }, 
    password:{
        type:String,
        required:[true]
    }, 
    taskStatus:{
        type:Boolean,
    }
})

ManagerChild.pre('save',async function(){
    this.password = await bcrypt.hash(this.password,12);
    });

const TeamLead = mongoose.model('ManagerChild',ManagerChild);
module.exports = TeamLead;
