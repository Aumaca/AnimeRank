import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"


import Navbar from "../../components/navbar/navbar.tsx"
import Loader from "../../components/loader/loader"

import { AuthState } from "../../interfaces/user.ts"
import { AnimeType } from "../../interfaces/common.ts" 
import { AnimeGraphQLResponse } from "../../interfaces/anime.ts"

import "./anime.css"

const Anime = () => {
	const user = useSelector((state: AuthState) => state.user)
	const [anime, setAnime] = useState<AnimeType | null>()
	const [isLoading, setIsLoading] = useState(true)
	const { id } = useParams()

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

	useEffect(() => {
		const variables = {
			id: id,
		}
		axios
			.post<AnimeGraphQLResponse>("https://graphql.anilist.co", {
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
				2
				setIsLoading(false)
			})
	}, [graphqlQuery, id])

	return (
		<>
			<Navbar />

			<div className="anime">
				{user && anime ? (
					<>
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
									<button className="favorite">
										Favorite{" "}
										<FontAwesomeIcon
											style={{ marginLeft: 5 }}
											icon={faHeart}
										/>
									</button>
									<button className="add">Add to list</button>
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
						</div>
					</>
				) : (
					<>
						<Loader isActive={isLoading} />
					</>
				)}
			</div>
		</>
	)
}

export default Anime
