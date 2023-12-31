import { AnimeType } from "../common"

export interface FormAnimeProps {
	isOpen: boolean
	anime: AnimeType | null
	closeForm: () => void
}

export interface FormAnimeData {
	id: string
	title: string
	status: string
	episodes: number
	score: number
	startDate: Date
	endDate: Date
	notes: string
}

export interface FormAnimeDataError {
	id: string
	title: string
	status: string
	episodes: string
	score: string
	startDate: string
	endDate: string
	notes: string
}

export interface Date {
	day: string
	month: string
	year: string
}