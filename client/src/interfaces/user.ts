import { Anime } from "./common"

export interface AuthState {
	user: userState | null
	token: string | null
}

export interface userState {
	username: string
	email: string
	password: string
	country: string
	picture: string | null
	createdAt: string
	watchedAnimes: watchedAnimes[]
	toWatchAnimes: Anime[]
	_id: string
}

interface watchedAnimes {
	anime: Anime
	score: number
	comment: string
}