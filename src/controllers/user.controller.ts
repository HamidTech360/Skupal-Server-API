import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
            <div> click <a href="https://easytopup.netlify.app/verify_account/${newUser.confirmationCode}">HERE</a> to verify your account</div>
        </div>
        `
        sendMail(req.body.email, 'Skupal Team', email_body)
    }catch(ex){
        res.status(500).send(ex)
    }

    
}