import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 10,
		maxlength: 60,
	},
	password: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
		default: "",
	},
	watchedAnimes: [
		{
			anime: { type: mongoose.Schema.Types.ObjectId, ref: "Anime" },
			score: Number,
			comment: String,
		},
	],
	toWatchAnimes: [
		{
			anime: { type: mongoose.Schema.Types.ObjectId, ref: "Anime" },
		},
	],
	country: {
		type: String,
	},
	createdAt: {
		type: String
	},
})
UserSchema.methods.countWatchedAnimes = () => {
	return this.watchedAnimes.length
}
UserSchema.methods.countToWatchAnimes = () => {
	return this.toWatchAnimes.length
}

const User = mongoose.model("User", UserSchema)

export default User
