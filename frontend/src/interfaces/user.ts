export interface AuthState {
	token: string | null
	username: string | null
}

export interface UserState {
	username: string
	email: string
	country: string
	picture: string | null
	createdAt: string
	animes: UserAnime[]
	_id: string
}

export interface ProfileState {
	username: string
	country: string
	picture: string | null
	createdAt: string
	animes: UserAnime[]
	favoriteAnimes: UserAnime[]
	countEpisodes: number
	statusData: StatusData
}

export interface UserAnime {
	id: string
	status: string
	episodes: number
	score: number
	notes: string
}

export interface StatusData {
	watching: number
	completed: number
	onHold: number
	dropped: number
	planToWatch: number
	[key: string]: number
}

export const scoreLabels: Record<number, string> = {
	1: "1 - Horrible",
	2: "2 - Bad",
	3: "3 - Poor",
	4: "4 - Below Average",
	5: "5 - Average",
	6: "6 - Above Average",
	7: "7 - Good",
	8: "8 - Very Good",
	9: "9 - Excellent",
	10: "10 - Fantastic",
}

export const status: string[] = [
	"Watching",
	"Completed",
	"On-Hold",
	"Dropped",
	"Plan to Watch",
]
