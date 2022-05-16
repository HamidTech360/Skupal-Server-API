import joi from 'joi-browser'

export function ValidateSkill (skill:any){
    const schema = {
        skill: joi.string().required(),
        skillId:joi.string().required()
    }

    return joi.validate(skill, schema)

}