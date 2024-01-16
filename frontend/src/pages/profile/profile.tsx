import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { Dispatch } from "redux"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import api from "../../api/api.ts"
import Navbar from "../../components/navbar/navbar.tsx"
import Message from "../../components/message/message.tsx"
import Loader from "../../components/loader/loader.tsx"
import ProfilePicture from "../../components/profilePicture/profilePicture.tsx"
import { setLogout } from "../../state/auth.ts"

import { AnimeType } from "../../interfaces/common.ts"
import { AuthState, ProfileState, status } from "../../interfaces/user.ts"
import { MessageProps } from "../../interfaces/components/message.ts"
import { ProfileResponse, AnimeResponse } from "../../interfaces/responses.ts"

import "./profile.css"
import "swiper/swiper-bundle.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-cards"
import Footer from "../../components/footer/footer.tsx"

const Profile = () => {
	const dispatcher: Dispatch = useDispatch()
	const usernameLogged = useSelector((state: AuthState) => state.username)
	const { username } = useParams()

	const [user, setUser] = useState<ProfileState>()
	const [userProfile, setUserProfile] = useState<ProfileState>()
	const [favoriteAnimes, setFavoriteAnimes] = useState<AnimeType[]>([])

	const [isLoading, setIsLoading] = useState(false)

	const [messageState, setMessageState] = useState<MessageProps>({
		isOpen: false,
		title: "",
		backgroundColor: "",
		children: "",
	})

	const closeMessage = (): void => {
		setMessageState({ ...messageState, isOpen: false })
	}

	useEffect(() => {
		api
			.get(`/user/getUser/${username}`)
			.then((res: ProfileResponse) => {
				setUserProfile(res.data)
			})
			.catch((err) => {
				console.log("Error user profile request: ", err.message)
			})

		api
			.get(`/user/getUser/${usernameLogged}`)
			.then((res: ProfileResponse) => {
				setUser(res.data)
			})
			.catch((err) => {
				console.log("Error user request: ", err.message)
			})
	}, [username, usernameLogged])

	useEffect(() => {
		// Favorite Animes
		const fetchAnimeData = async () => {
			try {
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

				if (userProfile) {
					const animeRequests = userProfile.favoriteAnimes.map((anime) => {
						const variables = { id: anime.id }
						return axios.post<AnimeResponse>("https://graphql.anilist.co", {
							query: graphqlQuery,
							variables: variables,
						})
					})

					const responses = await Promise.all(animeRequests)
					const newState: AnimeType[] = responses.map(
						(response) => response.data.data.Media
					)
					setFavoriteAnimes(newState)
				}
			} catch (error) {
				console.error("Animes request error:", error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchAnimeData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile])

	const deleteUser = (): void => {
		api
			.delete("/user/deleteUser")
			.then(() => {
				dispatcher(setLogout())
			})
			.catch(() => {
				setMessageState({
					isOpen: true,
					backgroundColor: "#D2042D",
					title: "Error",
					children: "An error occurred when deleting the user",
				})
			})
	}

	return (
		<>
			{userProfile && user ? (
				<>
					<Navbar user={user} />

					<div className="profile">
						<div className="profile_container">
							<h1>Profile</h1>
						</div>
						<div className="user_container">
							<div className="user">
								<div className="picture">
									<ProfilePicture
										image={userProfile.picture}
										size={100}
										classname="rounded"
									/>
								</div>
								<div className="username">
									<h1>{userProfile.username}</h1>
									<Link to={`/list/${userProfile.username}`}>
										<button>Anime List</button>
									</Link>
								</div>
							</div>
						</div>

						<div className="anime_stats_container">
							<div className="anime_stats">
								<h1 className="title">Anime Stats</h1>

								<div className="anime_stats_bar">
									{Object.keys(userProfile.statusData).map((status) => (
										<div
											key={status}
											className={`bar ${status}`}
											style={{
												width: `${
													(userProfile.statusData[status] /
														userProfile.animes.length) *
													100
												}%`,
											}}
										/>
									))}
								</div>

								<div className="stats_container">
									<div className="col1">
										<ul>
											{Object.keys(userProfile.statusData).map(
												(statusKey, i) => (
													<li key={statusKey}>
														<Link to={`/${username}/list/${i + 1}`}>
															<div className={`dot-color ${statusKey}`} />
															{status[i]}
														</Link>
														<span>{userProfile.statusData[statusKey]}</span>
													</li>
												)
											)}
										</ul>
									</div>
									<div className="col2">
										<ul>
											<li>
												<p>Total Animes</p>
												<span>{userProfile.animes.length}</span>
											</li>
											<li>
												<p>Episodes</p>
												<span>{userProfile.countEpisodes}</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{favoriteAnimes.length > 0 ? (
							<div className="favorites">
								<div className="container">
									<h1 className="title">Favorites</h1>
									<Swiper
										modules={[Navigation]}
										slidesPerView={2}
										navigation
										pagination={{ clickable: true }}
										className="swiper-slider"
									>
										{favoriteAnimes.map((anime) => (
											<SwiperSlide
												key={`swiper-${anime.id}`}
												className="slide"
											>
												<img
													src={anime.coverImage.large}
													alt=""
												/>
												<div className="content">
													<Link to={`/anime/${anime.id}`}>
														<h3>{anime.title.english}</h3>
													</Link>
												</div>
											</SwiperSlide>
										))}
									</Swiper>
								</div>
							</div>
						) : (
							<></>
						)}

						{user.username === userProfile.username ? (
							<div className="delete">
								<button onClick={() => deleteUser()}>
									Delete profile <FontAwesomeIcon icon={faTrash} />
								</button>
							</div>
						) : (
							<></>
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

					<Footer />
				</>
			) : (
				<>
					<Loader isActive={isLoading} />
				</>
			)}
		</>
	)
}

export default Profile
