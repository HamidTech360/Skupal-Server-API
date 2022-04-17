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

 export function ValidateTask (user:any){
    const schema = {
        clientId: joi.string().required(),
        job_description:joi.string().required(),
        job_title:joi.string().required(),
        duration:joi.string().required(),
        attachment:joi.string(),
        payment_type:joi.string().required(),
        payment_amount:joi.string().required(),
        required_skillsIDs:joi.array()
    }

    return joi.validate(user, schema)

}
export const TaskModel = mongoose.model('task', taskSchema)

// export {ValidateUser as ValidateUser};

