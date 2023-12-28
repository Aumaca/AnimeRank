import { useEffect, useState } from "react"
import axios from "axios"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

import Navbar from "../../components/navbar/navbar"

import "./homepage.css"

interface PageInfo {
	currentPage: number
}

interface Title {
	english: string
}

interface CoverImage {
	medium: string
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
		bestScoredAnimes: PageData
	}
}

const Homepage = () => {
	const [popularAnimes, setPopularAnimes] = useState<Media[] | null>(null)
	const [bestScoredAnimes, setBestScoredAnimes] = useState<Media[] | null>(null)

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
						medium
					}
				}
			}

			bestScoredAnimes: Page(page: $page, perPage: $perPage) {
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
						medium
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
				setBestScoredAnimes(data.bestScoredAnimes.media)
			})
			.catch((error) => {
				console.error("GraphQL request error:", error)
			})
	}, [])

	return (
		<>
			<Navbar />

			{popularAnimes && popularAnimes.length > 0 ? (
				<div className="homepage">
					<div className="news">
						<Swiper
							modules={[Pagination]}
							pagination={{ clickable: true }}
						>
							<SwiperSlide className="new">
								<img
									src=""
									alt=""
								/>
								<div className="content">
									<h1>News 1!</h1>
									<p>Somethiong about</p>
								</div>
							</SwiperSlide>
							<SwiperSlide className="new">
								<img
									src=""
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
							loop={true}
							slidesPerView={"auto"}
							navigation
							pagination={{ clickable: true }}
							onSwiper={(swiper) => console.log(swiper)}
							onSlideChange={() => console.log("slide change")}
						>
							{popularAnimes.map((anime) => (
								<SwiperSlide
									key={anime.id}
									className="slide"
								>
									<img
										src={anime.coverImage.medium}
										alt=""
									/>
									<div className="content">
										<h3>{anime.title.english}</h3>
										<h3 className="score">
											Score:{" "}
											<span style={{ color: "green" }}>
												{anime.averageScore}
											</span>
										</h3>
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
							loop={true}
							slidesPerView={"auto"}
							navigation
							pagination={{ clickable: true }}
							onSwiper={(swiper) => console.log(swiper)}
							onSlideChange={() => console.log("slide change")}
						>
							{bestScoredAnimes?.map((anime) => (
								<SwiperSlide
									key={anime.id}
									className="slide"
								>
									<img
										src={anime.coverImage.medium}
										alt=""
									/>
									<div className="content">
										<h3>{anime.title.english}</h3>
										<h3 className="score">
											Score:{" "}
											<span style={{ color: "green" }}>
												{anime.averageScore}
											</span>
										</h3>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			) : (
				<>
					<div className="latest container">
						<h1>ERROR</h1>
					</div>
				</>
			)}
		</>
	)
}

export default Homepage
