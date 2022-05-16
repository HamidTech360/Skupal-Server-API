import mongoose from 'mongoose'
import joi from 'joi-browser'



const taskSchema = new mongoose.Schema({
    clientId:{
        type:String,
        required:true
    },
    job_description:{
        type:String,
        required:true
    },
    job_title:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    attachment:{
        type:String,
        required:true
    },
    payment_type:{
        type:String,
        required:true
    },
    payment_amount:{
        type:String,
        required:true
    },
    required_skillsIDs:{
        type:Array
    }

}, {timestamps:true})


export const TaskModel = mongoose.model('task', taskSchema)

// export {ValidateUser as ValidateUser};

