import express from "express";
const router = express.Router()
import Auth from '../middlewares/auth'
import {
        createUser,
         AuthUser, 
         getUser, 
         verifyAccount,
         ResendVerificationCode
        } from '../controllers/user.controller'

router.post('/', createUser)
router.get('/', Auth, getUser)
router.post('/auth', AuthUser)
router.post('/verify', verifyAccount)
router.post('/resend_code',ResendVerificationCode)

export default router;