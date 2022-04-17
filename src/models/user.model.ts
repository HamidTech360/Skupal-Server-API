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
    accountName:{
        type:String,
        required:true
    },
    accountNumber:{
        type:Number,
        required:true
    },
    bank:{
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

 export function ValidateUser (user:any){
    const schema = {
        firstName:joi.string().required(),
        lastName:joi.string().required(),
        userName:joi.string().required(),
        email:joi.string().email().required(),
        phoneNumber:joi.string().required(),
        accountName:joi.string().required(),
        accountNumber:joi.string().required(),
        bank:joi.string().required(),
        DOB:joi.string().required(),
        password:joi.string().min(5).required(),
        skillIDs:joi.array(),
        socialMediaLinks:joi.array()
    }

    return joi.validate(user, schema)

}
export const UserModel = mongoose.model('user', userSchema)

// export {ValidateUser as ValidateUser};

