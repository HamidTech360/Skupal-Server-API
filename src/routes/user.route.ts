import express from "express";
const router = express.Router()
import Auth from '../middlewares/auth'
import {createUser, AuthUser, getUser, verifyAccount} from '../controllers/user.controller'

router.post('/', createUser)
router.get('/', Auth, getUser)
router.post('/auth', AuthUser)
router.post('/verify', verifyAccount)

export default router;