import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            country,
        } = req.body

        if (username.length === 0) {
            res.status(400).json({ field: "username", message: "Username invalid" })
            return
        }

        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        const isEmailValid = emailRegex.test(email)
        if (!isEmailValid) {
            res.status(400).json({ field: "email", message: "Email invalid" })
            return
        }

        if (password.length < 8) {
            res.status(400).json({ field: "password", message: "Password with less than 8 characters" })
            return
        }

        if (country === "") {
            res.status(400).json({ field: "country", message: "Select a country" })
            return
        }

        const existEmail = await User.findOne({ email: email })
        if (existEmail) {
            res.status(400).json({ field: "email", message: "Email already registered" })
            return
        }

        const salt = await bcrypt.genSalt()
        const pwdHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: pwdHash,
            picture: req.file ? req.file.filename : "",
            country,
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        const isEmailValid = emailRegex.test(email)
        if (!isEmailValid) {
            res.status(400).json({ field: "email", message: "Email invalid" })
            return
        }

        const user = await User.findOne({ email: email })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch || !user)
            return res.status(400).json({ field: "email", field2: "password", message: "Invalid credentials" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        
        const userObject = user.toObject()
        delete userObject.password

        res.status(200).json({ token, userObject })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}