import express from 'express'
import { createBootcamp, deleteBootcamp, getAllBotocamps, updateBootcamp } from '../controller/bootcampController.js'

const router = express.Router()

//@route - /api/v1/bootcamps/
router.route('/')
    .get(getAllBotocamps)
    .post(createBootcamp)

router.route('/:id')
    .put(updateBootcamp)
    .delete(deleteBootcamp)

export default router