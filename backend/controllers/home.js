import axios from "axios"

export const animes = async (req, res) => {
	try {
		const graphqlQuery = `
            query ($id: Int, $page: Int, $perPage: Int, $search: String) {
                popularAnimes: Page(page: $page, perPage: $perPage) {
                    pageInfo {
                        currentPage
                    }
                    media(id: $id, search: $search, sort: POPULARITY_DESC, type: ANIME) {
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
                }

                mostScoredAnimes: Page(page: $page, perPage: $perPage) {
                    pageInfo {
                        currentPage
                    }
                    media(id: $id, search: $search, sort: SCORE_DESC, type: ANIME) {
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
                }

                releasingAnimes: Page(page: $page, perPage: $perPage) {
                    pageInfo {
                        currentPage
                    }
                    media(id: $id, search: $search, sort: SCORE_DESC, status: RELEASING, type: ANIME) {
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
                }
            }
        `

		axios
			.post("https://graphql.anilist.co", {
				query: graphqlQuery,
			})
			.then((response) => {
				const data = response.data.data
                res.status(200).json({data: data})
			})
			.catch((error) => {
				console.error("Animes request error:", error)
                res.status(400).json({ error: err.message })
			})
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}
