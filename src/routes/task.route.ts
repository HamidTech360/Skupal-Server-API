import express from 'express'
const router = express.Router()
import auth from '../middlewares/auth'
import {saveTask, RecommendedTask} from '../controllers/tasks'

router.post('/', saveTask)
router.get('/recommended',auth, RecommendedTask )

export default router