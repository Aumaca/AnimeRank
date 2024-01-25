import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faHeart,
	faRightToBracket,
	faShareNodes,
	faStar,
	faUser,
} from "@fortawesome/free-solid-svg-icons"

import FormAnime from "../../components/formAnime/formAnime.tsx"
import Navbar from "../../components/navbar/navbar.tsx"
import Loader from "../../components/loader/loader.tsx"

import { AuthState, UserState } from "../../interfaces/user.ts"
import { AnimeType, Date } from "../../interfaces/common.ts"
import { AnimeResponse } from "../../interfaces/responses.ts"

import "./anime.css"
import api from "../../api/api.ts"
import Message from "../../components/message/message.tsx"
import { MessageProps } from "../../interfaces/components/message.ts"
import AnimeTrailer from "../../components/animeTrailer/animeTrailer.tsx"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "swiper/css/effect-coverflow"
import Page404 from "../../components/Page404/Page404.tsx"
import { getIconAnime, getStatusAnime } from "../../utils/getStatusAnime.ts"
import ApiError from "../../components/apiError/apiError.tsx"
import Modal from "../../components/modal/modal.tsx"

const Anime = () => {
	const username = useSelector((state: AuthState) => state.username)
	const [user, setUser] = useState<UserState | null>(null)

	const [anime, setAnime] = useState<AnimeType | null>()
	const [isFavorite, setIsFavorite] = useState<boolean>(false)

	const [isFormAnimeOpen, setIsFormAnimeOpen] = useState(false)
	const [isOpenModal, setIsOpenModal] = useState(false)

	const [isLoading, setIsLoading] = useState(true)

	const [messageState, setMessageState] = useState<MessageProps>({
		isOpen: false,
		title: "",
		backgroundColor: "",
		children: "",
	})

	const [descriptionState, setDescriptionState] = useState<boolean>(false)
	const [notFound, setNotFound] = useState<boolean>(false)
	const [hasErrorAPI, setHasErrorAPI] = useState<boolean>(false)

	const { animeId } = useParams()

	const graphqlQuery = `
		query ($id: Int) {
			Media(id: $id, type: ANIME) {
				id
				title {
					english
					romaji
					native
				}
				startDate {
					day
					month
					year
				}
				endDate {
					day
					month
					year
				}
				status
				episodes
				duration
				genres
				popularity
				averageScore
				coverImage {
					large
				}
				description
				trailer {
					id
					site
				}
				characters(sort: FAVOURITES_DESC) {
					nodes {
						name {
							full
						}
						image {
							medium
						}
					}
				}
				staff (perPage: 1) {
					nodes {
						name {
							full
						}
						image {
							medium
						}
						primaryOccupations
					}
				}
			}
		}
	`

	const openForm = (): void => {
		user ? setIsFormAnimeOpen(true) : setIsOpenModal(true)
	}

	const closeForm = (): void => {
		setIsFormAnimeOpen(false)
	}

	const closeMessage = (): void => {
		setMessageState({ ...messageState, isOpen: false })
	}

	const setUserIsFavorite = (): void => {
		setIsLoading(true)

		api
			.post("/user/setIsFavorite", {
				newIsFavorite: !isFavorite,
				animeId: anime!.id,
			})
			.then((res) => {
				setMessageState({
					isOpen: true,
					backgroundColor: "green",
					title: "Anime set to favorites!",
					children: "Anime set to favorites successfully",
				})
				setUser(res.data)
			})
			.catch(() => {
				setMessageState({
					isOpen: true,
					backgroundColor: "red",
					title: "An error occured",
					children: "Anime not exists in your actual anime list",
				})
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		// User
		api
			.get<UserState>(`/user/getUser/${username}`)
			.then((response) => {
				setUser(response.data)
			})

		const variables = {
			id: animeId,
		}
		axios
			.post<AnimeResponse>("https://graphql.anilist.co", {
				query: graphqlQuery,
				variables: variables,
			})
			.then((response) => {
				const data = response.data.data
				setAnime(data.Media)
			})
			.catch((error) => {
				error.message === "Network Error"
					? setHasErrorAPI(true)
					: setNotFound(true)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [graphqlQuery, animeId, username])

	useEffect(() => {
		if (
			user &&
			anime &&
			user.animes.filter((userAnime) => userAnime.id === anime.id)[0]
		) {
			setIsFavorite(
				user.animes.filter((userAnime) => userAnime.id === anime.id)[0]
					.isFavorite
			)
		}
	}, [user, anime])

	const setGenreString = (genre: string) => {
		const regex = new RegExp(" ", "g")
		return genre.replace(regex, "-").toLowerCase()
	}

	const setZeroToDate = (date: Date): string => {
		const month = date.month < 10 ? `0${date.month}` : date.month
		const day = date.day < 10 ? `0${date.day}` : date.day
		const year = date.year

		return `${month}/${day}/${year}`
	}

	if (anime) {
		return (
			<>
				{user ? <Navbar user={user} /> : <Navbar />}
				<div className="anime">
					<div className="share_button">
						<FontAwesomeIcon
							icon={faShareNodes}
							size="2x"
						/>
					</div>
					<div className="anime__header">
						<h1 className="title">{anime.title.english}</h1>
						<div className="other_titles">
							<ul>
								<li>
									<h1>{anime.title.romaji}</h1>
								</li>
								<li>
									<h1>{anime.title.native}</h1>
								</li>
							</ul>
						</div>
						<div className="infos">
							<ul>
								<li>{anime.startDate.year}</li>
								<li>{anime.duration} min</li>
							</ul>
						</div>
					</div>

					<div className="trailer_and_info_container">
						<div className="trailer_buttons">
							<AnimeTrailer
								animeTitle={anime.title.english}
								animeReleaseYear={anime.startDate.year}
								animeTrailerId={anime.trailer ? anime.trailer.id : null}
							/>

							<div className="anime__buttons">
								<button
									className={`favorite ${isFavorite ? "active" : ""}`}
									onClick={() => setUserIsFavorite()}
								>
									<div />
									<div>Favorite </div>
									<div>
										<FontAwesomeIcon icon={faHeart} />
									</div>
								</button>
								<button
									className={`add ${getStatusAnime(user, anime, true)}`}
									onClick={() => openForm()}
								>
									<div />
									<div>{getStatusAnime(user, anime, false)}</div>
									<div>
										<FontAwesomeIcon
											icon={getIconAnime(getStatusAnime(user, anime, false))}
										/>
									</div>
								</button>
							</div>
						</div>

						<div className="info_above_trailer">
							<div className="tags">
								<div className="tags_container">
									{anime.genres.map((genre) => (
										<div
											key={genre}
											className={`genre ${setGenreString(genre)}`}
										>
											<h4>{genre}</h4>
										</div>
									))}
								</div>
							</div>

							<div
								className={`description ${descriptionState ? "active" : ""}`}
							>
								<h2>Description:</h2>
								<p
									className={`${descriptionState ? "active" : ""}`}
									dangerouslySetInnerHTML={{ __html: anime.description }}
									onClick={() => setDescriptionState(!descriptionState)}
								></p>
							</div>

							<div className="score">
								<FontAwesomeIcon icon={faStar} />
								{anime.averageScore} / 100
							</div>

							<div className="users">
								<FontAwesomeIcon icon={faUser} />
								{anime.popularity.toLocaleString()}
								<p className="caption">users with this anime in their list</p>
							</div>
						</div>
					</div>

					<div className="characters_container">
						<h2>Characters</h2>
						<div className="characters">
							<Swiper
								modules={[Navigation]}
								slidesPerView={"auto"}
								spaceBetween={20}
								navigation
							>
								{anime.characters.nodes.map((character) => (
									<SwiperSlide
										key={character.name.full}
										className={`slide`}
									>
										<div
											key={character.name.full}
											className="character"
										>
											<img
												src={character.image.medium}
												alt=""
											/>
											<p>{character.name.full}</p>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>

					<div className="infos_container">
						<h2>Informations</h2>

						<div className="infos">
							<div className="info">
								<h3>Status</h3>
								<p>{anime.status}</p>
							</div>

							<div className="info">
								<h3>Episodes</h3>
								<p>{anime.episodes}</p>
							</div>

							<div className="info">
								<h3>Release Date</h3>
								<p>{setZeroToDate(anime.startDate)}</p>
							</div>

							<div className="info">
								<h3>Finish Date</h3>
								<p>{setZeroToDate(anime.endDate)}</p>
							</div>

							<div className="info">
								<h3>{anime.staff.nodes[0].primaryOccupations[0]}</h3>
								<p>{anime.staff.nodes[0].name.full}</p>
							</div>
						</div>
					</div>

					<Modal
						isOpen={isOpenModal}
						setIsOpen={setIsOpenModal}
						backgroundColor="blue"
					>
						<FontAwesomeIcon
							icon={faRightToBracket}
							size="4x"
						/>
						<p>You need to be logged to add animes to your list.</p>
						<Link
							to="/login"
							className="modal_link"
						>
							<button>Go to login page</button>
						</Link>
					</Modal>

					{user && (
						<FormAnime
							anime={anime}
							isOpen={isFormAnimeOpen}
							closeForm={closeForm}
							user={user}
							toSetUser={setUser}
							setIsLoading={setIsLoading}
							setMessageState={setMessageState}
						/>
					)}

					<Message
						closeMessage={closeMessage}
						isOpen={messageState.isOpen}
						title={messageState.title}
						backgroundColor={messageState.backgroundColor}
					>
						{messageState.children}
					</Message>
				</div>

				<Loader isActive={isLoading} />
			</>
		)
	} else if (notFound) {
		return <Page404 />
	} else if (hasErrorAPI) {
		return <ApiError />
	}
}

export default Anime
