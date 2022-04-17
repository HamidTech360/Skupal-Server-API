import express from 'express'
const router = express.Router()
import { FetchAvailableSkills, AddSkill } from '../controllers/skill.controller'

router.post('/', AddSkill)
router.get('/', FetchAvailableSkills)


export default router