import { AnimeType } from "../common"

export interface FormAnimeProps {
	isOpen: boolean
	anime: AnimeType | null
	closeForm: () => void
}

export interface FormAnimeData {
	id: string
	status: string
	episodes: number
	score: number
	notes: string
}

export interface FormAnimeDataError {
	status: string
	episodes: string
	score: string
	notes: string
}

export interface Date {
	day: string
	month: string
	year: string
}
