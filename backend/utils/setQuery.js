/**
 * Return the query and his variables as an object
 * @returns {{query: string, variables: {search?: string, format?: string}}}
 */
const setQuery = ({ searchString, format, sort, page }) => {
	// Variables
	const variables = {}

	if (searchString) variables.search = searchString

	if (format) variables.format = format

	sort ? (variables.sort = sort) : (variables.sort = "POPULARITY_DESC")

	if (page) variables.page = page

	// Query
	const query = `
        query ($id: Int, $page: Int, $search: String, $sort: [MediaSort], $format: MediaFormat) {
            Page (page: $page, perPage: 10) {
                media(id: $id, format: $format, search: $search, sort: $sort, type: ANIME) {
                    id
                    title {
                        english
                        romaji
                    }
                    episodes
                    popularity
                    averageScore
                    meanScore
                    coverImage {
                        large
                    }
                    format
                }
            }
        }
    `

	return { query: query, variables: variables }
}

export default setQuery
