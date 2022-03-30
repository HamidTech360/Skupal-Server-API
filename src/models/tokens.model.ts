import mongoose from 'mongoose'
import joi from 'joi-browser'

const tokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:1800
    }
})


export const TokenModel = mongoose.model('token', tokenSchema)