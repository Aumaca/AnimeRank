import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Missing username"],
		unique: [true],
		minlength: [3, "Username must have more than 3 characters"],
		maxlength: [20, "Username must have less than 20 characters"],
		validate: {
			validator: async function (v) {
				const usernameIsUsed = await mongoose.model("User").findOne({ username: v })
				return !usernameIsUsed
			},
			message: "This username is already in use.",
		},
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
					const emailIsUsed = await mongoose.model("User").findOne({ email: v })
					return !emailIsUsed
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
			status: String,
			episodes: Number,
			score: Number,
			notes: String,
			isFavorite: Boolean,
		},
	],
	country: {
		type: String,
	},
	createdAt: {
		type: String,
	},
})

UserSchema.methods.filterAnimesStatus = function (cb) {
	const statusData = {
		watching: 0,
		completed: 0,
		onHold: 0,
		dropped: 0,
		planToWatch: 0,
	}

	this.animes.forEach((anime) => {
		switch (anime.status) {
			case "Watching":
				statusData.watching++
				break
			case "Completed":
				statusData.completed++
				break
			case "On-Hold":
				statusData.onHold++
				break
			case "Dropped":
				statusData.dropped++
				break
			case "Plan to Watch":
				statusData.planToWatch++
				break
		}
	})

	return statusData
}

UserSchema.methods.countEpisodes = function (cb) {
	let sum = 0
	this.animes.forEach((anime) => {
		sum += anime.episodes
	})

	return sum
}

UserSchema.methods.getFavoriteAnimes = function (cb) {
	let favorites = []
	this.animes.forEach((anime) => {
		if (anime.isFavorite) {
			favorites.push(anime)
		}
	})
	return favorites
}

const User = mongoose.model("User", UserSchema)

export default User
