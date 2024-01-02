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
	animes: Anime[]
	_id: string
}

export interface Anime {
	animeId: string
	episodes: number
	score: number
	comment: string
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
