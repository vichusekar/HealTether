const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")
const UserModel = require("../models/UserModel")
const { hashPassword, createToken, comparePassword } = require("../authentication/auth")



router.post('/sign-up', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            req.body.password = await hashPassword(req.body.password)
            let newUser = await UserModel.create(req.body)
            newUser.save()
            res.status(200).send({ message: "Signup Success" })
        }
        else {
            res.status(400).send({ message: `User with ${req.body.email} already exist` })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.post('/sign-in', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            if (await comparePassword(req.body.password, user.password)) {
                let token = await createToken(user)
                res.status(200).send({ message: "Login Successfully", token })
            }
            else {
                res.status(400).send({ message: "Invalid Credential" })
            }
        }
        else {
            res.status(404).send({ message: `User with ${req.body.email} is not found` })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})


router.post('/forgot-password/:id', async (req, res) => {
    try {
        const oldUser = await UserModel.findOne({ email: req.body.email })
        if (oldUser) {
            const passwordLink = `http://localhost:3000/${oldUser._id}`

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vigneshecom093@gmail.com',
                    pass: 'kznv npox aaxy nnvp'
                }
            })

            var mailOptions = {
                from: 'vigneshmsho093@gmail.com',
                to: req.body.email,
                subject: 'Reset your password ',
                text: `Kindly visit the link and change your password ${passwordLink}`,
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            res.status(200).send({ message: 'Email Sent Successfully' })

        }

        else {
            res.status(404).send({ message: `User with ${req.body.email} doesn't exists`, error: error?.message })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })

    }
})

router.post('/reset-password/:id', async (req, res) => {
    try {
        let user = await UserModel.findById({ _id: req.params.id })
        if (user) {
            user.password = await hashPassword(req.body.password)
            user.save()
            res.status(200).send({ message: "Password Updated Successfullly" })
        }
        else {
            res.status(404).send({ message: `User not found` })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

module.exports = router