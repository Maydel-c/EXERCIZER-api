const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    }
})

userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error('Both email and password are required')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email Id')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(20)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})
    return user

}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Both fields are required')
    }
    
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('User not found')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)