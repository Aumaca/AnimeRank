import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
	faEye,
	faCheck,
	faPause,
	faStop,
	faCalendarDay,
	faPlus,
} from "@fortawesome/free-solid-svg-icons"
import { AnimeType } from "../interfaces/common"
import { UserState } from "../interfaces/user"

export const getStatusAnime = (
	user: UserState | null,
	anime: AnimeType,
	toClassName: boolean,
	toSearch?: boolean
): string => {
	if (!user && !toSearch) return "Add to List"
	if (!user && toSearch) return ""

	const animes = user!.animes.filter((userAnime) => userAnime.id === anime.id)
	if (animes.length <= 0 && !toSearch) return "Add to List"
	if (animes.length <= 0 && toSearch) return ""

	if (toClassName) {
		return animes[0].status
			.toLowerCase()
			.replace("-", "")
			.replace(" ", "")
			.replace(" ", "")
	} else {
		return animes[0].status
	}
}

export const getIconAnime = (status: string): IconDefinition => {
	status = status
		.toLowerCase()
		.replace("-", "")
		.replace(" ", "")
		.replace(" ", "")
	if (status === "watching") return faEye
	if (status === "completed") return faCheck
	if (status === "onhold") return faPause
	if (status === "dropped") return faStop
	if (status === "plantowatch") return faCalendarDay
	return faPlus
}
