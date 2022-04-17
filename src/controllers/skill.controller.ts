import { ValidateSkill, skillModel } from "../models/skills.model";

export const AddSkill = async (req:any, res:any, next:any)=>{
    const {error} = ValidateSkill(req.body)
    if(error) return res.status(401).send(error.details[0].message)

    const checkSkill = await skillModel.findOne({skillId:req.body.skillId})
    if(checkSkill) return res.status(400).send(`SkillId "${req.body.skillId}" has been taken `)

    try{
        const newSkill = new skillModel({
            skill:req.body.skill,
            skillId:req.body.skillId
        })
      const savedSkill=  await newSkill.save()
      res.json({
          status:'success',
          message:'Skill uploaded successfully',
          data:savedSkill
      })
    }catch(err){
        res.status(500).send(err)
    }
}

export const FetchAvailableSkills = async (req:any, res:any, next:any)=>{
   try{
        const skills = await skillModel.find()
        res.json({
            status:'success',
            message:'Skills fetched successfully',
            data:skills
        })
   }catch(err){
       res.status(500).send(err)
   }
}