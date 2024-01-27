import axios from "axios"

import setQuery from "../utils/setQuery.js"

export const fetchQuery = async (req, res) => {
	try {
		const { query, variables } = setQuery(req.query)

		await axios
			.post("https://graphql.anilist.co", {
				query: query,
				variables: variables,
			})
			.then((response) => {
				res.status(200).json(response.data)
			})
			.catch((err) => {
				res.status(400).json(err)
			})
	} catch (err) {
		res.status(400).json(err)
	}
}
