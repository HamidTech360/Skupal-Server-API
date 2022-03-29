import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import joi from 'joi-browser'
import {CONFIG} from '../config'
const config = CONFIG()
import { ValidateUser,  UserModel } from "../models/user.model"
import {sendMail} from '../utils/mail'



export const createUser = async (req:any, res:any, next:any)=>{
    const {error} = ValidateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)

   
    try{
        const findUser = await UserModel.findOne({email:req.body.email})
        if (findUser) return res.status(401).send('Email has been taken')

        const token = jwt.sign({email:req.body.email}, `${config.JWT_SECRET}`)
    
        const {firstName, lastName, userName, email, password, DOB, accountName, accountNumber, skills, socialMediaLinks, bank, phoneNumber} = req.body
        const newUser = new UserModel ({
            firstName, lastName, userName, email, password, DOB, accountName, accountNumber, skills, socialMediaLinks,bank, phoneNumber,
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

        const email_body= `
        <div>
            <div>Welcome to SKUPAL. We hope to serve you with the best freelancing experience</div>
            <div> click <a href="https://skupal.netlify.app/verify_account/${newUser.confirmationCode}">HERE</a> to verify your account</div>
        </div>
        `
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
    const {ref} = req.body
    try{
        const checkCode = await UserModel.findOne({confirmationCode:ref})
        if(!checkCode) return res.status(400).send('Failed to verify account')

        checkCode.status = "verified"
        checkCode.save()
        res.json({
            status:'success',
            message:'Account successfully verified'
        })
    }catch(ex){
        res.status(500).send('Server Error. Cannot verify account')
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