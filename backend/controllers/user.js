import User from "../models/User.js"

const status = ["Watching", "Completed", "On-Hold", "Dropped", "Plan to Watch"]

export const getUser = async (req, res) => {
	try {
		const username = req.params.username
		const statusParam = req.params.status
		User.findOne({ username: username })
			.select("username picture country createdAt animes")
			.then((userData) => {
				if (statusParam) {
					userData.animes = userData.animes.filter(
						(anime) => anime.status === status[parseInt(statusParam) - 1]
					)
				}

				const statusData = userData.filterAnimesStatus()
				const countEpisodes = userData.countEpisodes()
				const favoriteAnimes = userData.getFavoriteAnimes()

				const userDataObj = userData.toObject()
				userDataObj.statusData = statusData
				userDataObj.countEpisodes = countEpisodes
				userDataObj.favoriteAnimes = favoriteAnimes

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

export const deleteUser = async (req, res) => {
	User.findOneAndDelete({ username: req.username })
		.then(() => {
			res.status(200).json({ message: "User deleted successfully" })
		})
		.catch((err) => {
			res.status(400).json({ err: err.message })
		})
}


export const addAnimeUserList = async (req, res) => {
	const status = [
		"Watching",
		"Completed",
		"On-Hold",
		"Dropped",
		"Plan to Watch",
	]

	const scoreLabels = {
		1: "1 - Horrible",
		2: "2 - Bad",
		3: "3 - Poor",
		4: "4 - Below Average",
		5: "5 - Average",
		6: "6 - Above Average",
		7: "7 - Good",
		8: "8 - Very Good",
		9: "9 - Excellent",
		10: "10 - Fantastic",
	}

	try {
		const formAnimeData = req.body.formAnimeData
		const anime = req.body.anime

		// episodes
		if (formAnimeData.episodes > anime.episodes || formAnimeData.episodes < 0) {
			return res.status(400).json({
				field: "episodes",
				message: "Episodes invalid",
			})
		}

		if (
			(formAnimeData.episodes === anime.episodes &&
				formAnimeData.status !== status[1]) ||
			(formAnimeData.episodes !== 0 && formAnimeData.status === status[4])
		) {
			return res.status(400).json({
				field: "episodes",
				message: "Episodes watched and status don't match",
			})
		}

		// status
		if (!status.includes(formAnimeData.status)) {
			// status
			return res.status(400).json({
				field: "status",
				message: "Invalid status",
			})
		}

		// score
		if (!(formAnimeData.score >= 0 && formAnimeData.score <= 10)) {
			return res.status(400).json({
				field: "status",
				message: "Invalid score",
			})
		}

		// notes
		if (formAnimeData.notes.length > 100) {
			return res.status(400).json({
				field: "notes",
				message: "Notes has more than 100 chars",
			})
		}

		// isFavorite
		if (formAnimeData.isFavorite === "No") {
			formAnimeData.isFavorite = false
		} else {
			formAnimeData.isFavorite = true
		}

		const user = await User.findOne({ username: req.username })
		const indexIfExists = user.animes.findIndex(
			(anime) => anime.id === formAnimeData.id.toString()
		)
		const newAnimes = user.animes
		if (indexIfExists !== -1) {
			newAnimes[indexIfExists] = formAnimeData
		} else {
			newAnimes.push(formAnimeData)
		}

		User.findOneAndUpdate(
			{
				username: req.username,
			},
			{
				$set: {
					animes: newAnimes,
				},
			},
			{ new: true }
		)
			.then((updatedUser) => {
				res.status(200).json(updatedUser.animes)
			})
			.catch((err) => {
				console.log(err)
				res.status(400).json({ error: err.message })
			})
	} catch (err) {
		console.log(err)
		res.status(400).json({ error: err.message })
	}
}