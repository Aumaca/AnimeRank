import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import api from "../../api/api.ts"
import Loader from "../../components/loader/loader.tsx"
import Navbar from "../../components/navbar/navbar.tsx"
import ProfilePicture from "../../components/profilePicture/profilePicture.tsx"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBorderAll, faListUl } from "@fortawesome/free-solid-svg-icons"

import { AnimeType } from "../../interfaces/common.ts"
import { AuthState, ProfileState } from "../../interfaces/user.ts"
import { AnimeResponse, ProfileResponse } from "../../interfaces/responses.ts"

import "./animeList.css"

const AnimeList = () => {
	const usernameLogged = useSelector((state: AuthState) => state.username)
	const { username } = useParams()

	const [user, setUser] = useState<ProfileState>()
	const [userProfile, setUserProfile] = useState<ProfileState>()

	const [animes, setAnimes] = useState<AnimeType[]>()

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		api
			.get(`/user/${username}`)
			.then((res: ProfileResponse) => {
				setUserProfile(res.data)
			})
			.catch((err) => {
				console.log("Error user profile request: ", err.message)
			})

		api
			.get(`/user/${usernameLogged}`)
			.then((res: ProfileResponse) => {
				setUser(res.data)
			})
			.catch((err) => {
				console.log("Error user request: ", err.message)
			})
	}, [username, usernameLogged])

	useEffect(() => {
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
					const animeRequests = userProfile.animes.map((anime) => {
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

					setAnimes(newState)
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

	return (
		<>
			{user && userProfile ? (
				<>
					<Navbar user={user} />

					<div className="animelist">
						<div className="animelist_container">
							<div></div>
							<h1>AnimeList of {userProfile.username}</h1>
							<div className="icons">
								<FontAwesomeIcon
									icon={faBorderAll}
									size="2x"
									className="grid"
								/>
								<FontAwesomeIcon
									icon={faListUl}
									size="2x"
									className="list"
								/>
							</div>
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
									<Link to={`/profile/${userProfile.username}`}>
										<button>User Profile</button>
									</Link>
								</div>
							</div>
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

export default AnimeList
