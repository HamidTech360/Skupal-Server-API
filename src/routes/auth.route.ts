import express from "express";
const router = express.Router()
import Auth from '../middlewares/auth'
import {
        createUser,
         AuthUser, 
         verifyAccount,
         ResendVerificationCode
        } from '../controllers/auth'

router.post('/', createUser)
router.post('/login', AuthUser)
router.post('/verify', verifyAccount)
router.post('/resend_code',ResendVerificationCode)

export default router;