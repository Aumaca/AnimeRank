import { ReactNode } from "react"

export interface PageData {
	pageInfo: PageInfo
	media: AnimeType[]
}

interface PageInfo {
	currentPage: number
}

export interface AnimeType {
	id: string
	title: Title
	coverImage: CoverImage
	startDate: Date
	endDate: Date
	status: string
	episodes: number
	duration: number
	genres: string[]
	popularity: number
	averageScore: number
}

interface Title {
	english: string
}

interface CoverImage {
	large: string
}

export interface Date {
	day: number
	month: number
	year: number
}

export interface MessageProps {
	isOpen: boolean
	title: string
	children: ReactNode
	backgroundColor: string
	closeMessage: VoidFunction
}

export interface ProfilePictureProps {
	image: string | null
	size: number
	classname?: string
}