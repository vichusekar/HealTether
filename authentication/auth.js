const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


let hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

let comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

let createToken = async (email, _id, password) => {
    let token = await jwt.sign(
        { email, _id, password },
        process.env.JWT_SK,
        { expiresIn: process.env.JWT_EXPIRE }
    )
    return token
}

module.exports = { hashPassword, comparePassword, createToken }