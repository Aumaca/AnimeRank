import { UserState, ProfileState } from "./user"
import { PageData } from "./common"
import { AnimeType } from "./common"

export interface UserResponse {
	userData: UserState
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
