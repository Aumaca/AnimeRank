/**
 * Return the query and his variables as an object
 * @returns {{query: string, variables: {search?: string, format?: string}}}
 */
const setQuery = ({ q, format, sort, page, status }) => {
	// Variables
	const variables = {}

	if (q) variables.search = q
    if (status) variables.status = status
	if (format) variables.format = format
	if (page) variables.page = page
	sort ? (variables.sort = sort) : (variables.sort = "POPULARITY_DESC")

	// Query
	const query = `
        query ($id: Int, $search: String, $sort: [MediaSort], $status: [MediaStatus], $page: Int, $format: MediaFormat) {
            Page (page: $page, perPage: 50) {
                media(id: $id, search: $search, sort: $sort, status_in: $status, format: $format, type: ANIME) {
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
    console.log(variables)
	return { query: query, variables: variables }
}

export default setQuery
