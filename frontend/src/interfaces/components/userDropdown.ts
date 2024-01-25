import { ProfileState } from "../user"
type UserBasicState<T> = Omit<
	T,
	"favoriteAnimes" | "countEpisodes" | "statusData"
>

export interface userDropdownProps {
	isActive: boolean
	user?: UserBasicState<ProfileState> | null
}
