/* eslint-disable no-mixed-spaces-and-tabs */
import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import api from "../../api/api.ts"
import Loader from "../../components/loader/loader.tsx"
import Navbar from "../../components/navbar/navbar.tsx"
import ProfilePicture from "../../components/profilePicture/profilePicture.tsx"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBorderAll,
	faListUl,
	faStar,
} from "@fortawesome/free-solid-svg-icons"

import { AnimeType } from "../../interfaces/common.ts"
import {
	AuthState,
	ProfileState,
	scoreOnlyLabels,
} from "../../interfaces/user.ts"
import { UserAndListResponse } from "../../interfaces/responses.ts"

import "./animeList.css"

const AnimeList = () => {
	const navigator = useNavigate()

	const params = new URLSearchParams(location.search)
	const statusParam = params.get("status")

	const usernameLogged = useSelector((state: AuthState) => state.username)
	const { username } = useParams()

	const [user, setUser] = useState<ProfileState>()
	const [userProfile, setUserProfile] = useState<ProfileState>()

	const [animes, setAnimes] = useState<AnimeType[]>()
	const [listViewStyle, setListViewStyle] = useState<boolean>(false)
	const [filter, setFilter] = useState<string>(statusParam ? statusParam : "")

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		api
			.get(`/user/getUser/${usernameLogged}`)
			.then((res) => {
				setUser(res.data)
			})
			.catch((err) => {
				console.log("Error user request: ", err.message)
			})

		api
			.get<UserAndListResponse>(
				`/user/getUserAndList/${username}${
					statusParam ? `?status=${statusParam}` : ""
				}`
			)
			.then((res) => {
				console.log(res)
				setUserProfile(res.data.user)
				setAnimes(res.data.animes)
			})
			.catch((err) => {
				console.log("Error user profile request: ", err.message)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [username, usernameLogged, statusParam])

	const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setFilter(event.target.value)
		const status = event.target.value
		return navigator(
			`/list/${userProfile?.username}?${new URLSearchParams({
				status,
			}).toString()}`
		)
	}

	return (
		<>
			{user && userProfile && animes ? (
				<>
					<Navbar user={user} />

					<div className="animelist">
						<div className="animelist_header">
							<div></div>
							<h1>AnimeList of {userProfile.username}</h1>
							<div className="icons">
								<FontAwesomeIcon
									icon={faBorderAll}
									size="2x"
									className={`grid ${listViewStyle ? "" : "active"}`}
									onClick={() => setListViewStyle(!listViewStyle)}
								/>
								<FontAwesomeIcon
									icon={faListUl}
									size="2x"
									className={`list ${listViewStyle ? "active" : ""}`}
									onClick={() => setListViewStyle(!listViewStyle)}
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

						<div className="animelist_filter">
							<select
								name="filter"
								onChange={handleFilterChange}
								value={filter}
							>
								<option
									key={0}
									value={0}
								>
									{"All Anime"}
								</option>
								<option
									key={1}
									value={1}
								>
									{"Watching"}
								</option>
								<option
									key={2}
									value={2}
								>
									{"Completed"}
								</option>
								<option
									key={3}
									value={3}
								>
									{"On-Hold"}
								</option>
								<option
									key={4}
									value={4}
								>
									{"Dropped"}
								</option>
								<option
									key={5}
									value={5}
								>
									{"Plan to Watch"}
								</option>
							</select>
						</div>

						<div
							className={`animelist_container ${
								listViewStyle ? "list" : "grid"
							}`}
						>
							{animes.map((anime) => (
								<>
									{listViewStyle ? (
										<Link
											to={`/anime/${anime.id}`}
											key={anime.id + "A"}
										>
											<div className="anime_item">
												<img
													src={anime.coverImage.large}
													alt=""
													className={`${userProfile.animes
														.filter((userAnime) => userAnime.id === anime.id)[0]
														.status.toLowerCase()}`}
												/>
												<div className="content">
													<h2>{anime.title.english}</h2>

													<div className="status">
														<h3
															className={`${userProfile.animes
																.filter(
																	(userAnime) => userAnime.id === anime.id
																)[0]
																.status.toLowerCase()}`}
														>
															{
																userProfile.animes.filter(
																	(userAnime) => userAnime.id === anime.id
																)[0].status
															}
														</h3>
													</div>

													<div className="notes">
														<h3>
															{userProfile.animes.filter(
																(userAnime) => userAnime.id === anime.id
															)[0].notes
																? `"${
																		userProfile.animes.filter(
																			(userAnime) => userAnime.id === anime.id
																		)[0].notes
																  }"`
																: ""}
														</h3>
													</div>

													<div className="information">
														<p>
															Watched:&nbsp;
															{
																userProfile.animes.filter(
																	(userAnime) => userAnime.id === anime.id
																)[0].episodes
															}
														</p>

														<div className="score">
															<h3>
																{
																	userProfile.animes.filter(
																		(userAnime) => userAnime.id === anime.id
																	)[0].score
																}
															</h3>
															<FontAwesomeIcon
																icon={faStar}
																size="xl"
															/>
															<h3>
																{
																	scoreOnlyLabels[
																		userProfile.animes.filter(
																			(userAnime) => userAnime.id === anime.id
																		)[0].score - 1
																	]
																}
															</h3>
														</div>
													</div>
												</div>
											</div>
										</Link>
									) : (
										<Link
											to={`/anime/${anime.id}`}
											key={anime.id}
										>
											<div className="anime_item">
												<img
													src={anime.coverImage.large}
													alt=""
													className={`${userProfile.animes
														.filter((userAnime) => userAnime.id === anime.id)[0]
														.status.toLowerCase()}`}
												/>
												<div className="content">
													<h2>{anime.title.english}</h2>
													<div className="information">
														<p>
															Watched:&nbsp;
															{
																userProfile.animes.filter(
																	(userAnime) => userAnime.id === anime.id
																)[0].episodes
															}
														</p>
														<div className="score">
															<h3>
																{
																	userProfile.animes.filter(
																		(userAnime) => userAnime.id === anime.id
																	)[0].score
																}
															</h3>
															<FontAwesomeIcon
																icon={faStar}
																size="xl"
															/>
														</div>
													</div>
												</div>
											</div>
										</Link>
									)}
								</>
							))}
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
