import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faList } from "@fortawesome/free-solid-svg-icons"

import FormAnime from "../../components/formAnime/formAnime.tsx"
import Navbar from "../../components/navbar/navbar.tsx"
import Loader from "../../components/loader/loader"

import { AuthState, UserState } from "../../interfaces/user.ts"
import { AnimeType } from "../../interfaces/common.ts"
import { AnimeResponse } from "../../interfaces/responses.ts"

import "./anime.css"
import api from "../../api/api.ts"
import Message from "../../components/message/message.tsx"
import { MessageProps } from "../../interfaces/components/message"

const Anime = () => {
	const username = useSelector((state: AuthState) => state.username)
	const [user, setUser] = useState<UserState>()

	const [anime, setAnime] = useState<AnimeType | null>()
	const [isFavorite, setIsFavorite] = useState<boolean>(false)

	const [isFormAnimeOpen, setIsFormAnimeOpen] = useState(false)

	const [isLoading, setIsLoading] = useState(true)

	const [messageState, setMessageState] = useState<MessageProps>({
		isOpen: false,
		title: "",
		backgroundColor: "",
		children: "",
	})

	const { animeId } = useParams()

	const graphqlQuery = `
		query ($id: Int) {
			Media(id: $id, type: ANIME) {
				id
				title {
					english
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
			}
		}
	`

	const closeForm = (): void => {
		setIsFormAnimeOpen(false)
	}

	const closeMessage = (): void => {
		setMessageState({ ...messageState, isOpen: false })
	}

	const setUserIsFavorite = (): void => {
		setIsLoading(true)

		api
			.put("/user/setIsFavorite", {
				newIsFavorite: !isFavorite,
				animeId: anime!.id,
			})
			.then((res) => {
				setUser(res.data.user)
				if (res.status === 200) {
					setMessageState({
						isOpen: true,
						backgroundColor: "green",
						title: "Anime set to favorites!",
						children: "Anime set to favorites successfully",
					})
				} else {
					setMessageState({
						isOpen: true,
						backgroundColor: "red",
						title: "An error occured",
						children: "Anime not exists in your actual anime list",
					})
				}
			})
			.catch((err) => {
				console.log(err)
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
			.catch((error) => {
				console.error("User request error:", error)
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
				console.error("GraphQL request error:", error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [graphqlQuery, animeId, username])

	useEffect(() => {
		if (user && anime) {
			setIsFavorite(
				user.animes.filter((userAnime) => userAnime.id === anime!.id)[0]
					.isFavorite
			)
		}
	}, [user, anime])

	return (
		<>
			{username && anime && user ? (
				<>
					<Navbar user={user} />
					<div className="anime">
						<div className="anime__container_image_buttons_info">
							<div className="anime__container__image_buttons">
								<div className="anime__cover">
									<h1 className="anime__title">{anime.title.english}</h1>
									<img
										src={anime.coverImage.large}
										alt=""
									/>
								</div>
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
										className="add"
										onClick={() => setIsFormAnimeOpen(true)}
									>
										<div />
										<div>Add to list</div>
										<div>
											<FontAwesomeIcon icon={faList} />
										</div>
									</button>
								</div>
							</div>
							<div className="info">
								<div className="info__container">
									<div className="info__title">
										<h1>Informations</h1>
									</div>
									<div className="information">
										<h2>Title</h2>
										<p>{anime.title.english}</p>
									</div>
									<div className="information">
										<h2>Start Date</h2>
										<p>
											{anime.startDate.month}/{anime.startDate.day}/
											{anime.startDate.year}
										</p>
									</div>
									<div className="information">
										<h2>End Date</h2>
										<p>
											{anime.endDate.month}/{anime.endDate.day}/
											{anime.endDate.year}
										</p>
									</div>
									<div className="information">
										<h2>Status</h2>
										<p>{anime.status}</p>
									</div>
									<div className="information">
										<h2>Episodes</h2>
										<p>{anime.episodes}</p>
									</div>
									<div className="information">
										<h2>Duration of episodes</h2>
										<p>{anime.duration} minutes</p>
									</div>
									<div className="information">
										<h2>Genres</h2>
										<p>{anime.genres.join(", ")}</p>
									</div>
									<div className="information">
										<h2>Popularity</h2>
										<p>{anime.popularity}</p>
									</div>
									<div className="information">
										<h2>Average Score</h2>
										<p>{anime.averageScore}</p>
									</div>
								</div>
							</div>
							<FormAnime
								anime={anime}
								isOpen={isFormAnimeOpen}
								closeForm={closeForm}
								user={user}
								toSetUser={setUser}
								setIsLoading={setIsLoading}
								setMessageState={setMessageState}
							/>
							<Message
								closeMessage={closeMessage}
								isOpen={messageState.isOpen}
								title={messageState.title}
								backgroundColor={messageState.backgroundColor}
							>
								{messageState.children}
							</Message>
						</div>
					</div>
				</>
			) : (
				<>
					<Navbar />
					<Loader isActive={isLoading} />
				</>
			)}
		</>
	)
}

export default Anime
