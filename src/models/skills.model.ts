import mongoose from 'mongoose'
import joi from 'joi-browser'



const skillSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:true
    },
    skillId:{
        type:String,
        required:true
    }

}, {timestamps:true})

 export function ValidateSkill (skill:any){
    const schema = {
        skill: joi.string().required(),
        skillId:joi.string().required()
    }

    return joi.validate(skill, schema)

}
export const skillModel = mongoose.model('skill', skillSchema)

// export {ValidateUser as ValidateUser};

