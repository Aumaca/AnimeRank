import { ProfileState } from "./user"
import { PageData } from "./common"
import { AnimeType } from "./common"

export interface LoginResponse {
	token: string
	username: string
}

export interface ProfileResponse {
	data: ProfileState
}

export interface HomePageResponse {
	data: {
		popularAnimes: PageData
		mostScoredAnimes: PageData
	}
}

export interface AnimeResponse {
	data: {
		Media: AnimeType
	}
}
