import { AnimeType } from "../common"
import { UserState } from "../user"
import { MessageProps } from "./message"

export interface FormAnimeProps {
	isOpen: boolean
	anime: AnimeType | null
	user: UserState
	toSetUser: (user: UserState) => void
	closeForm: () => void
	setIsLoading: (bool: boolean) => void
	setMessageState: (props: MessageProps) => void
}

export interface FormAnimeData {
	id: string
	status: string
	episodes: number
	score: number
	notes: string
	isFavorite: string
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
