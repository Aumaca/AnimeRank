import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Missing username"],
		minlength: [3, "Username must have more than 3 characters"],
		maxlength: [20, "Username must have less than 20 characters"],
	},
	email: {
		type: String,
		unique: [true],
		validate: [
			{
				validator: (v) => {
					return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
				},
				message: "Invalid email",
			},
			{
				validator: async function (v) {
					const userExists = await mongoose.model("User").findOne({ email: v })
					return !userExists
				},
				message: "This email is already in use.",
			},
		],
		required: [true, "Missing email"],
		minlength: [10, "Email must have more than 10 characters"],
		maxlength: [60, "Email must have less than 60 characters"],
	},
	password: {
		type: String,
		required: [true, "Missing password"],
	},
	picture: {
		type: String,
		default: "",
	},
	animes: [
		{
			id: String,
			episodesWatched: Number,
			score: Number,
			notes: String,
		},
	],
	country: {
		type: String,
	},
	createdAt: {
		type: String,
	},
})

const User = mongoose.model("User", UserSchema)

export default User
