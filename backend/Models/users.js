const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({

    name:{

        type:String,
        required:[true,"please enter user name"],
        minlength:[5,"user name should be greater than 5 characters"]
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        minlength:[8,'password should be greater than 8 characters']
    },
    role:{
        type:String,
        default:'user'
        
    }

});

userSchema.pre('save',async function(){
this.password = await bcrypt.hash(this.password,12);
});

 

const User = mongoose.model('users',userSchema);

module.exports = User;
