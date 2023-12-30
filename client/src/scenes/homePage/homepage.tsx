import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "swiper/css/effect-coverflow"

import Navbar from "../../components/navbar/navbar"
import Loader from "../../components/loader/loader"
import jujutsu from "../../imgs/jujutsu.jpg"
import drstone from "../../imgs/drstone.png"

import "./homepage.css"

interface PageInfo {
	currentPage: number
}

interface Title {
	english: string
}

interface CoverImage {
	large: string
}

interface Media {
	id: number
	title: Title
	coverImage: CoverImage
	averageScore: number
}

interface PageData {
	pageInfo: PageInfo
	media: Media[]
}

interface GraphQLResponse {
	data: {
		popularAnimes: PageData
		mostScoredAnimes: PageData
	}
}

const Homepage = () => {
	const [popularAnimes, setPopularAnimes] = useState<Media[] | null>(null)
	const [mostScoredAnimes, setMostScoredAnimes] = useState<Media[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const graphqlQuery = `
		query ($id: Int, $page: Int, $perPage: Int, $search: String) {
			popularAnimes: Page(page: $page, perPage: $perPage) {
				pageInfo {
				currentPage
				}
				media(id: $id, search: $search, sort: POPULARITY_DESC, type: ANIME) {
					id
					title {
						english
					}
					averageScore
					coverImage {
						large
					}
				}
			}

			mostScoredAnimes: Page(page: $page, perPage: $perPage) {
				pageInfo {
					currentPage
				}
				media(id: $id, search: $search, sort: SCORE_DESC, type: ANIME) {
					id
					title {
						english
					}
					averageScore
					coverImage {
						large
					}
				}
			}
		}
	`

	useEffect(() => {
		axios
			.post<GraphQLResponse>("https://graphql.anilist.co", {
				query: graphqlQuery,
			})
			.then((response) => {
				const data = response.data.data
				setPopularAnimes(data.popularAnimes.media)
				setMostScoredAnimes(data.mostScoredAnimes.media)
			})
			.catch((error) => {
				console.error("GraphQL request error:", error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [graphqlQuery])

	return (
		<>
			<Navbar />

			{popularAnimes && popularAnimes.length > 0 ? (
				<div className="homepage">
					<div className="news">
						<Swiper
							modules={[Pagination, EffectCoverflow]}
							pagination={{ clickable: true }}
							loop={true}
							slidesPerView={1}
							centeredSlides={true}
							effect="coverflow"
							breakpoints={{
								768: {
									slidesPerView: 2,
								},
							}}
						>
							<SwiperSlide className="new">
								<img
									src={jujutsu}
									alt=""
								/>
								<div className="content">
									<h1>JUJUTSU KAISEN Season 2</h1>
									<h3>Released last episode of the season!</h3>
								</div>
							</SwiperSlide>
							<SwiperSlide className="new">
								<img
									src={drstone}
									alt=""
								/>
								<div className="content">
									<h1>News 2!</h1>
									<p>Somethiong about</p>
								</div>
							</SwiperSlide>
							<SwiperSlide className="new">
								<img
									src=""
									alt=""
								/>
								<div className="content">
									<h1>News 3!</h1>
									<p>Somethiong about</p>
								</div>
							</SwiperSlide>
						</Swiper>
					</div>

					<div className="container">
						<h1>Most Popular</h1>
						<Swiper
							modules={[Navigation]}
							spaceBetween={20}
							slidesPerView={"auto"}
							navigation
							pagination={{ clickable: true }}
						>
							{popularAnimes.map((anime) => (
								<SwiperSlide
									key={anime.id}
									className="slide"
								>
									<img
										src={anime.coverImage.large}
										alt=""
									/>

									<FontAwesomeIcon
										icon={faPlus}
										size="2x"
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

					<div className="container">
						<h1>Most Scored</h1>
						<Swiper
							modules={[Navigation]}
							spaceBetween={20}
							slidesPerView={"auto"}
							navigation
							pagination={{ clickable: true }}
						>
							{mostScoredAnimes!.map((anime) => (
								<SwiperSlide
									key={anime.id}
									className="slide"
								>
									<img
										src={anime.coverImage.large}
										alt=""
									/>
									<FontAwesomeIcon
										icon={faPlus}
										size="2x"
									/>

									<div className="content">
										<h3>{anime.title.english}</h3>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					<div className="container">
						<h1>Most Scored</h1>
						<Swiper
							modules={[Navigation]}
							spaceBetween={20}
							slidesPerView={"auto"}
							navigation
							pagination={{ clickable: true }}
						>
							{mostScoredAnimes!.map((anime) => (
								<SwiperSlide
									key={anime.id}
									className="slide"
								>
									<img
										src={anime.coverImage.large}
										alt=""
									/>
									<div className="content">
										<h3>{anime.title.english}</h3>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			) : (
				<>
					<Loader isActive={isLoading} />
				</>
			)}
		</>
	)
}

export default Homepage
