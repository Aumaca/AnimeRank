import User from "../models/User.js"

const status = ["Watching", "Completed", "On-Hold", "Dropped", "Plan to Watch"]

export const getUser = async (req, res) => {
	try {
		const userId = req.params.userId
		const statusParam = req.params.status
		User.findById(req.userId)
			.select("username picture country createdAt animes")
			.then((userData) => {
				if (statusParam) {
					userData.animes = userData.animes.filter(
						(anime) => anime.status === status[parseInt(statusParam) - 1]
					)
				}

				const statusData = userData.filterAnimesStatus()
				const countEpisodes = userData.countEpisodes()

				const userDataObj = userData.toObject()
				userDataObj.statusData = statusData
				userDataObj.countEpisodes = countEpisodes

				res.status(200).json(userDataObj)
			})
			.catch((err) => {
				console.log(err)
				res.status(400).json({ error: err })
			})
	} catch (err) {
		res.status(400).json({ error: err })
	}
}
