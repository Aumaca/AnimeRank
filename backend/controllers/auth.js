import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

/* REGISTER USER */
export const register = async (req, res) => {
	try {
		const { username, email, password, country } = req.body

		const salt = await bcrypt.genSalt()
		const pwdHash = await bcrypt.hash(password, salt)

		const newUser = new User({
			username,
			email,
			password: pwdHash,
			picture: req.file ? req.file.filename : "default_user.png",
			country,
			createdAt: new Date().toLocaleDateString("en-US"),
		})

		try {
			await newUser.save()
			res.status(201).json({ msg: "user saved" })
		} catch (err) {
			res.status(400).json({
				field: err.errors[Object.keys(err.errors)[0]].properties.path,
				message: err.errors[Object.keys(err.errors)[0]].message,
			})
		}
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

/* LOGGING IN */
export const login = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email: email })
		if (!user) {
			return res.status(400).json({ field: "email", message: "Email invalid" })
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch || !user)
			return res.status(400).json({
				field: "email",
				field2: "password",
				message: "Invalid credentials",
			})

		const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET)

		res.status(200).json({ token: token, username: user.username })
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}
