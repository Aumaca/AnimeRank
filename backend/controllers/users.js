import User from "../models/User.js"

export const getUser = async (req, res) => {
	try {
		const { id } = req.params
		const user = await User.findById(id)
		res.status(200).json(user)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const getUserList = async (req, res) => {
	try {
		const { id } = req.params
		if (id === req.userId) {
			const user = await User.findById(id)
			res.status(200).json(user)
		} else {
			res.status(403).json({ message: "Invalid credentials" })
		}
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const addAnimeUserList = async (req, res) => {
	try {
		console.log(req.body)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}
