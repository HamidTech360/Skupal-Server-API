import joi from 'joi-browser'


export function ValidateUser (user:any){
    const schema = {
        firstName:joi.string().required(),
        lastName:joi.string().required(),
        userName:joi.string().required(),
        email:joi.string().email().required(),
        phoneNumber:joi.string().required(),
        DOB:joi.string().required(),
        password:joi.string().min(5).required(),
        skillIDs:joi.array(),
        socialMediaLinks:joi.array()
    }

    return joi.validate(user, schema)

}

export function ValidateAuth (user:any){
    const schema = {
        email:joi.string().required(),
        password:joi.string().required()
    }
    return joi.validate(user, schema)
}