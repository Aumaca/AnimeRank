import User from "../models/User.js"
import axios from "axios"

const status = ["Watching", "Completed", "On-Hold", "Dropped", "Plan to Watch"]

export const getUser = async (req, res) => {
	try {
		const username = req.params.username

		const userData = await User.findOne({ username: username }).select(
			"username picture country createdAt animes"
		)
		if (!userData) return res.status(404).json({ error: "User not found" })

		const statusData = userData.filterAnimesStatus()
		const countEpisodes = userData.countEpisodes()
		const favoriteAnimes = userData.getFavoriteAnimes()

		const userDataObj = userData.toObject()

		userDataObj.statusData = statusData
		userDataObj.countEpisodes = countEpisodes
		userDataObj.favoriteAnimes = favoriteAnimes

		res.status(200).json(userDataObj)
	} catch (err) {
		res.status(400).json({ error: err })
	}
}

export const getUsers = async (req, res) => {
	try {
		const profilesData = await User.find({}).select(
			"username picture country createdAt animes"
		)
		if (!profilesData) return res.status(404).json({ error: "User not found" })

		const profilesDataObj = profilesData.map((profileData) => {
			const profile = profileData.toObject()
			profile.countEpisodes = profileData.countEpisodes()
			return profile
		})

		res.status(200).json(profilesDataObj)
	} catch (err) {
		res.status(400).json({ error: err })
	}
}

export const getUserAndList = async (req, res) => {
	try {
		const username = req.params.username
		const statusParam = req.query.status

		const userData = await User.findOne({ username: username }).select(
			"username picture country createdAt animes"
		)
		if (!userData) return res.status(404).json({ error: "User not found" })

		const statusData = userData.filterAnimesStatus()
		const countEpisodes = userData.countEpisodes()
		const favoriteAnimes = userData.getFavoriteAnimes()

		const userDataObj = userData.toObject()

		if (parseInt(statusParam)) {
			userDataObj.animes = userDataObj.animes.filter(
				(anime) => anime.status === status[parseInt(statusParam) - 1]
			)
		}

		if (userDataObj.animes.length > 0) {
			userDataObj.statusData = statusData
			userDataObj.countEpisodes = countEpisodes
			userDataObj.favoriteAnimes = favoriteAnimes

			// Get animes info
			let queries = ""
			userDataObj.animes.forEach((anime, i) => {
				queries += `
					a${anime.id}: Media(id: $id${i}, type: ANIME) {
						id
						title {
							english
						}
						startDate {
							day
							month
							year
						}
						endDate {
							day
							month
							year
						}
						status
						episodes
						duration
						genres
						popularity
						averageScore
						coverImage {
							large
						}
					}
				`
			})

			const variableDefinitions = userDataObj.animes
				.map((_, i) => `$id${i}: Int`)
				.join(", ")

			const variables = {}
			userDataObj.animes.forEach((anime, i) => {
				variables["id" + i] = parseInt(anime.id)
			})

			const graphqlQuery = `
						query (${variableDefinitions}) {
							${queries}
						}
					`

			const animes = []

			await axios
				.post("https://graphql.anilist.co", {
					query: graphqlQuery,
					variables: variables,
				})
				.then((res) => {
					Object.values(res.data.data).forEach((anime) => {
						animes.push(anime)
					})
				})

			return res.status(200).json({ animes: animes, user: userDataObj })
		} else {
			return res.status(200).json({ animes: [], user: userDataObj })
		}
	} catch (err) {
		res.status(400).json(err)
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

export const addUpdateAnimeUserList = async (req, res) => {
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

		formAnimeData.id = parseInt(formAnimeData.id)

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
		const indexToUpdate = user.animes.findIndex(
			(anime) => anime.id === formAnimeData.id
		)

		const filter = { username: req.username }

		if (indexToUpdate !== -1) {
			const operation = { $set: { [`animes.${indexToUpdate}`]: formAnimeData } }
			User.findOneAndUpdate(filter, operation, { new: true })
				.then((updatedUser) => {
					res.status(200).json(updatedUser.animes)
				})
				.catch((err) => {
					res.status(400).json({ error: err.message })
				})
		} else {
			const operation = { $push: { animes: formAnimeData } }
			User.findOneAndUpdate(filter, operation, { new: true })
				.then((updatedUser) => {
					res.status(201).json(updatedUser.animes)
				})
				.catch((err) => {
					res.status(400).json({ error: err.message })
				})
		}
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

export const deleteAnimeUserList = async (req, res) => {
	try {
		const anime = req.body.anime
		const username = req.username

		const user = await User.findOne({ username: username })
		const animeExistsInUserList = user.animes?.findIndex(
			(userAnime) => userAnime.id === anime.id
		)

		if (animeExistsInUserList !== -1) {
			const userObj = user.toObject()
			const newAnimes = []
			userObj.animes.forEach((userAnime) => {
				if (userAnime.id !== anime.id) newAnimes.push(userAnime)
			})

			const filter = { username: username }
			const operation = { $set: { animes: newAnimes } }

			User.findOneAndUpdate(filter, operation, { new: true })
				.then((updatedUser) => {
					res.status(200).json(updatedUser)
				})
				.catch((err) => {
					res.status(400).json({ error: err.message })
				})
		} else {
			res.status(404).json({ error: "Anime not found in the user's list" })
		}
	} catch (err) {
		res.status(400).json(err)
	}
}

export const setIsFavorite = async (req, res) => {
	try {
		const animeId = req.body.animeId
		const newIsFavorite = req.body.newIsFavorite
		const user = await User.findOne({ username: req.username })

		const userObj = user.toObject()

		const indexToUpdate = userObj.animes.findIndex(
			(anime) => anime.id === animeId
		)

		const userAnimeChanged = {
			...userObj.animes[indexToUpdate],
			isFavorite: newIsFavorite,
		}

		const filter = { username: req.username }

		if (indexToUpdate !== -1) {
			const operation = {
				$set: { [`animes.${indexToUpdate}`]: userAnimeChanged },
			}
			User.findOneAndUpdate(filter, operation, { new: true })
				.then((updatedUser) => {
					res.status(200).json(updatedUser)
				})
				.catch((err) => {
					res.status(400).json({ error: err.message })
				})
		} else {
			res.status(400).json({ error: err.message })
		}
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}
