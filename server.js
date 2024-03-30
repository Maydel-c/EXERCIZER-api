require('dotenv').config()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/users')
const express = require('express')
var cors = require('cors');

const app = express()

app.use(cors());
app.use(express.json())
app.use('/', (req, res, next) => {
    console.log(req.url, req.method) 
    next()
})
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
    res.json({mssg:'Welcome'})
})


mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })
