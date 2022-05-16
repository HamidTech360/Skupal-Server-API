import { TaskModel } from "../../models/task.model";
import {ValidateTask} from '../../validators/tasks'

export const saveTask = async (req:any, res:any, next:any)=>{
    const {error} = ValidateTask(req.body)
    if(error) return res.status(401).send(error.details[0].message)
    const {clientId, duration, payment_amount, job_description, job_title, required_skillsIDs, attachment,payment_type } = req.body
    
    try{
        const newTask = new TaskModel ({
            clientId, duration, payment_amount, job_description,
            job_title, required_skillsIDs, attachment, payment_type
        })
        const saveTask = newTask.save()
        res.json({
            status:'success',
            message:'Job posted successfully'
        })
    }catch(ex){
        res.status(500).send(ex)
    }
}

export const RecommendedTask = async (req:any, res:any, next:any)=>{
   // console.log(req.user._doc);
    const user = req.user._doc  
    try{
        
        const recommended = await TaskModel.find({
            required_skillsIDs:{
                "$in":user.skillIDs
            }
        })
        console.log(user.skillIDs);
        
        res.json({
            status:'success',
            message:"successfully fetch recommended jobs",
            data:recommended
        })
    }catch(err){
        res.status(500).send(err)
    }
}





