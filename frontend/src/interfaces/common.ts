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
	description: string
	trailer: Trailer
	characters: Characters
	staff: Staff
	format: string
}

interface StaffNode {
	name: CharacterName
	image: CharacterImage
	primaryOccupations: string[]
}

interface Staff {
	nodes: StaffNode[]
}

interface CharacterImage {
	medium: string
}

interface CharacterName {
	full: string
}

interface CharactersNode {
	name: CharacterName
	image: CharacterImage
}

interface Characters {
	nodes: CharactersNode[]
}

interface Trailer {
	id: string
	site: string
}

interface Title {
	english: string
	romaji: string
	native: string
}

interface CoverImage {
	large: string
	medium: string
}

export interface Date {
	day: number
	month: number
	year: number
}

export interface PageData {
	pageInfo: PageInfo
	media: AnimeType[]
}

interface PageInfo {
	currentPage: number
}