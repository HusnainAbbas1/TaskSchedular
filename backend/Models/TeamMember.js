const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true]
    },
    password:{
        type:String,
        required:[true]
    },
    role:{
        type:String,
        required:[true]
    },
    lead_id:{
        type:ObjectId,
        required:[true]
    }

})

userSchema.pre('save',async function(){
    this.password = await bcrypt.hash(this.password,12);
    });


  const TeamMember =  mongoose.model('TeamMember',TeamMemberSchema);
  module.exports = TeamMember;