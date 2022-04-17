import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import joi from 'joi-browser'
import {CONFIG} from '../config'
const config = CONFIG()
import { ValidateUser,  UserModel } from "../models/user.model"
import { TokenModel } from '../models/tokens.model'
import {sendMail} from '../utils/mail'
import { tokenMailTemplate } from '../utils/tokenMailTemplate'



export const createUser = async (req:any, res:any, next:any)=>{
    const {error} = ValidateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)

   
    try{
        const findUser = await UserModel.findOne({email:req.body.email})
        if (findUser) return res.status(401).send('Email has been taken')

        const token = Math.floor(Math.random()* (999999-100000) + 1000000)
    
        const {firstName, lastName, userName, email, password, DOB, accountName, accountNumber, skillIDs, socialMediaLinks, bank, phoneNumber} = req.body
        const newUser = new UserModel ({
            firstName, lastName, userName, email, password, DOB, accountName, accountNumber, skillIDs, socialMediaLinks,bank, phoneNumber,
            confirmationCode:token
        })
        
        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(newUser.password, salt)
        // console.log(newUser);
        
        const saveUser = await newUser.save()
        res.json({
            status:'success',
            message:'User created successfully. verification email sent',
            data:{}
        })

        const newToken = new TokenModel({
            token, userEmail:saveUser.email
        })
        console.log(newToken);
        

        await newToken.save()
        const email_body= tokenMailTemplate(token)
        sendMail(req.body.email, 'Skupal Team', email_body)
    }catch(ex){
        res.status(500).send(ex)
    }

    
}

export const AuthUser = async (req:any, res:any, next:any)=>{
    const {error} = ValidateAuth(req.body)
    if(error) return res.status(400).send(error.details[0].message)


    try{
        const checkUser = await UserModel.findOne({email:req.body.email})
        if(!checkUser) return res.status(401).send('User not found')

        const checkPwd = await bcrypt.compare(req.body.password, checkUser.password)
        if(!checkPwd) return res.status(401).send('Invalid password')
        
        
        
        const token= jwt.sign({...checkUser}, `${config.JWT_SECRET}`)
     
        
        res.json({
            status:'success',
            message:'Login successful',
            Auth_token:token,
           
        })
      
    }catch(ex){
        res.status(500).send('Server Error')
    }
}

export const verifyAccount = async (req:any, res:any, next:any)=>{
    const {token, email} = req.body
    try{

        const user = await UserModel.findOne({email})
        if(!user) return res.status(401).send('Not a user')

        const checkCode = await TokenModel.findOne({token, userEmail:email})
        if(!checkCode) return res.status(400).send('Invalid token supplied or token already expired')

        if(user.status==='verified') return res.json({
            status:'success',
            message:'User is already verified'
        })

        user.status = "verified"
        user.save()
        res.json({
            status:'success',
            message:'user successfully verified'
        })
    }catch(ex){
        res.status(500).send('Server Error. Cannot verify account')
    }
}

export const ResendVerificationCode = async (req:any, res:any, next:any)=>{
    const {email} = req.body
    const token = Math.floor(Math.random()* (999999-100000) + 1000000)
    try{

        const user = await UserModel.findOne({email})
        if(!user) return res.status(401).send('Not a user')

        const email_body= tokenMailTemplate(token)
        sendMail(email, 'Skupal Team', email_body)

        const newToken = new TokenModel({
            token, userEmail:email
        })
        await newToken.save()
        console.log(newToken);

        res.json({
            status:'success',
            message:'Token Resent successfully'
        })
    }catch(ex){
        res.status(500).send('Failed to resend code')
    }
}

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



function ValidateAuth (user:any){
    const schema = {
        email:joi.string().required(),
        password:joi.string().required()
    }
    return joi.validate(user, schema)
}