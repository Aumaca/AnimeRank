import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import { AnimeType } from "../../interfaces/common"
import { UserState } from "../../interfaces/user"

import { getStatusAnime, getIconAnime } from "../../utils/getStatusAnime"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/scrollbar"

type HomeSliderProps = {
	user: UserState|null
	animesArray: AnimeType[]
	handleClickAdd: (anime: AnimeType) => void
}

const HomeSlider: React.FC<HomeSliderProps> = ({ user, animesArray, handleClickAdd }) => {
	return (
		<SwiperComponent
			modules={[Navigation]}
			spaceBetween={20}
			slidesPerView={"auto"}
			navigation
		>
			{animesArray.map((anime) => (
				<SwiperSlide
					key={anime.id}
					className={`slide ${getStatusAnime(user, anime, true)}`}
				>
					<img
						src={anime.coverImage.large}
						alt=""
					/>

					<FontAwesomeIcon
						icon={getIconAnime(getStatusAnime(user, anime, true))}
						size="2x"
						onClick={() => handleClickAdd(anime)}
					/>

					<div className="content">
						<Link to={`/anime/${anime.id}`}>
							<h3>{anime.title.english}</h3>
						</Link>
					</div>
				</SwiperSlide>
			))}
		</SwiperComponent>
	)
}

export default HomeSlider
