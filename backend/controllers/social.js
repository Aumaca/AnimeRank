import User from "../models/User.js"

const status = ["Watching", "Completed", "On-Hold", "Dropped", "Plan to Watch"]

export const getUser = (req, res) => {
	const userId = req.params.userId
	const statusParam = req.params.status
	console.log(statusParam)
	User.findById(userId)
		.select("username picture country createdAt animes")
		.then((userData) => {
			if (statusParam) {
				userData.animes = userData.animes.filter(
					(anime) => anime.status === status[parseInt(statusParam) - 1]
				)
			}

			const statusData = userData.filterAnimesStatus()
			const countEpisodes = userData.countEpisodes()
			userData = userData.toObject()
			userData.statusData = statusData
			userData.countEpisodes = countEpisodes

			res.status(200).json(userData)
		})
		.catch((err) => {
			console.log(err)
			res.status(400).json({ error: err })
		})
}
