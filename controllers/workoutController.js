const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')

const getWorkouts = async (req, res) => {
    try {
        const user_id = req.user._id
        const workouts = await Workout.find({user_id}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({error:'Invalid objectId'})
    }
    try {
        const workout = await Workout.find({ _id: id })
        if (!workout) {
            return res.status(400).json({error:'No workout found with requested objectId'})
        }
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const postWorkout = async (req, res) => {
    const { title, reps, load } = req.body
    const emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Fields missing', emptyFields })
    }
    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, reps, load, user_id })
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({error:'Invalid ObjectId'})
    }
    try {
        const workout = await Workout.findOneAndDelete({ _id: id })
        if (!workout) {
            return res.status(400).json({error:'No workout found with requested objectId'})
        }
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const patchWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error:'Invalid objectId'})
    }
    try {
        const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    getWorkout,
    getWorkouts,
    postWorkout,
    deleteWorkout,
    patchWorkout
}