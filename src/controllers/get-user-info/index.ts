import {UserModel} from '../../models/user.model'

export const getUser = async (req:any, res:any, next:any)=>{
    try{      
        const user = await UserModel.findById(req.user._doc._id)
        user.password=""
        user.confirmationCode=""
        res.json({
            status:'success',
            data:user
        })
    }catch(error){
        res.status(403).send(error)
    }
}