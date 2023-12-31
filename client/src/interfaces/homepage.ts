import { PageData } from "./common"

export interface HomePageGraphQLResponse {
	data: {
		popularAnimes: PageData
		mostScoredAnimes: PageData
	}
}