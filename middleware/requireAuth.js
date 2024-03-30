const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req,res,next) => {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(400).json({ error: 'Authentication token required' })
    }
    const token = authorization.split(' ')[1]
    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: 'Request is not authorized' })
    }
}

module.exports = requireAuth