import { AnimeType } from "./common"

export interface AnimeGraphQLResponse {
	data: {
		Media: AnimeType
	}
}
