import User from "../models/User.js"

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
		const user = await User.findById(req.userId)
		console.log(user)
		const formAnimeData = req.body.formAnimeData
		const anime = req.body.anime

		// episodes
		if (formAnimeData.episodes > anime.episodes || formAnimeData.episodes < 0) {
			res.status(400).json({
				field: "episodes",
				message: "Episodes invalid",
			})
		}

		if (
			(formAnimeData.episodes === anime.episodes &&
				formAnimeData.status !== status[1]) ||
			(formAnimeData.episodes !== 0 && formAnimeData.status === status[4])
		) {
			res.status(400).json({
				field: "episodes",
				message: "Episodes watched and status don't match",
			})
		}

		// status
		if (!status.includes(formAnimeData.status)) {
			// status
			res.status(400).json({
				field: "status",
				message: "Invalid status",
			})
		}

		// score
		console.log(formAnimeData)
		if (!(formAnimeData.score >= 0 && formAnimeData.score <= 10)) {
			res.status(400).json({
				field: "status",
				message: "Invalid score",
			})
		}

		// notes
		if (formAnimeData.notes.length > 100) {
			res.status(400).json({
				field: "notes",
				message: "Notes has more than 100 chars",
			})
		}

		User.findOneAndUpdate(
			{
				_id: req.userId,
			},
			{
				$push: {
					watchedAnimes: formAnimeData,
				},
			},
			{ new: true }
		)
			.then((updatedUser) => {
				console.log(updatedUser)
			})
			.catch((err) => {
				console.error(err)
			})

		res.status(200).json({ message: "Anime added to user list" })
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}
