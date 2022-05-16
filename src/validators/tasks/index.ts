import joi from 'joi-browser'
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