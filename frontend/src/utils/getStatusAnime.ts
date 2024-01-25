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
	user: UserState,
	anime: AnimeType,
	toClassName: boolean
): string => {
	if (user!.animes.filter((userAnime) => userAnime.id === anime.id)[0]) {
		if (toClassName) {
			return user!.animes
				.filter((userAnime) => userAnime.id === anime.id)[0]
				.status.toLowerCase()
				.replace("-", "")
				.replace(" ", "")
				.replace(" ", "")
		}
		else {
			const status = user!.animes.filter((userAnime) => userAnime.id === anime.id)
			if (status.length <= 0) 
				return "Add to List"
			else
				return status[0].status
		}
	} else {
		return ""
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
