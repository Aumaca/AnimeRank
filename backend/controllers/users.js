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
					animes: formAnimeData,
				},
			},
			{ new: true }
		)
			.then((updatedUser) => {
				res.status(200).json(updatedUser.animes)
			})
			.catch((err) => {
				res.status(404).json({ error: err.message })
			})
	} catch (err) {
		res.status(404).json({ error: err.message })
	}
}

export const deleteUser = async (req, res) => {
	User.findByIdAndDelete({ _id: req.userId })
		.then(() => {
			res.status(200).json({ message: "User deleted successfully" })
		})
		.catch((err) => {
			res.status(400).json({ err: err.message })
		})
}
