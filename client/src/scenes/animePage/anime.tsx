import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { AuthState } from "../../state/index.ts"
import ProfilePicture from "../../components/profilePicture/profilePicture.tsx"

import Navbar from "../../components/navbar/navbar.tsx"
import Loader from "../../components/loader/loader"

import "./anime.css"

interface Title {
	english: string
}

interface CoverImage {
	large: string
}

interface Date {
	day: number
	month: number
	year: number
}

interface Media {
	id: number
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
}

interface GraphQLResponse {
	data: {
		Media: Media
	}
}

const Anime = () => {
	const user = useSelector((state: AuthState) => state.user)
	const [anime, setAnime] = useState<Media | null>()
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
			.post<GraphQLResponse>("https://graphql.anilist.co", {
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
										Favorite <FontAwesomeIcon style={{marginLeft: 5}} icon={faHeart} />
									</button>
									<button className="add">Add to list</button>
								</div>
							</div>
							<div className="info">
								<div className="info__title">
									<h1>Informations</h1>
								</div>

								<div className="info__container">
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
										<p>{anime.duration}</p>
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
