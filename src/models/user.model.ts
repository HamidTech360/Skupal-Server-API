import mongoose from 'mongoose'
import joi from 'joi-browser'



const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    skillIDs:{
        type:Array
    },
    socialMediaLinks:{
        type:Array
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'verified'],
        default:'pending'
    },
    totalEarnings:{
        type:Number,
        default:0
    },
    confirmationCode:{
        type:String,
        unique:true
    }
}, {timestamps:true})

 
export const UserModel = mongoose.model('user', userSchema)

// export {ValidateUser as ValidateUser};

