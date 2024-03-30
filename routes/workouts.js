const express = require('express')
const router = express.Router()

const { 
    getWorkout,
    getWorkouts,
    postWorkout,
    patchWorkout,
    deleteWorkout
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)
router.get('/', getWorkouts)
router.get('/:id', getWorkout)
router.post('/', postWorkout)
router.delete('/:id', deleteWorkout)
router.patch('/:id', patchWorkout)

module.exports=router