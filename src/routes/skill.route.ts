import express from 'express'
const router = express.Router()
import { FetchAvailableSkills, AddSkill } from '../controllers/skills'

router.post('/', AddSkill)
router.get('/', FetchAvailableSkills)


export default router