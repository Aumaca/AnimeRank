import { ProfileState } from "./user"
import { PageData, AnimeType } from "./common"

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
		releasingAnimes: PageData
	}
}

export interface AnimeResponse {
	data: {
		Media: AnimeType
	}
}

export interface UserAndListResponse {
	user: ProfileState
	animes: AnimeType[]
}

export interface SearchAnimeResponse {
	data: {
		Page: {
			media: AnimeType[]
		}
	}
}
