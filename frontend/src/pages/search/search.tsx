import { ChangeEvent, useEffect, useState } from "react"
import Loader from "../../components/loader/loader"
import Navbar from "../../components/navbar/navbar"
import { useSelector } from "react-redux"
import api from "../../api/api"
import { AnimeType } from "../../interfaces/common"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBorderAll,
	faListUl,
	faSearch,
	faStar,
} from "@fortawesome/free-solid-svg-icons"
import {
	ProfileResponse,
	SearchAnimeResponse,
} from "../../interfaces/responses"
import { AuthState, ProfileState } from "../../interfaces/user"

import { Link } from "react-router-dom"
import "./search.css"
import ApiError from "../../components/apiError/apiError.tsx"
import { getStatusAnime } from "../../utils/getStatusAnime.ts"

const Search = () => {
	const username = useSelector((state: AuthState) => state.username)
	const [user, setUser] = useState<ProfileState | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const [listViewStyle, setListViewStyle] = useState<boolean>(false)

	const [searchString, setSearchString] = useState<string>("")
	const [animes, setAnimes] = useState<AnimeType[]>([])
	const [hasErrorAPI, setHasErrorAPI] = useState<boolean>(false)

	useEffect(() => {
		api
			.get(`/user/getUser/${username}`)
			.then((res: ProfileResponse) => {
				setUser(res.data)
			})
			.catch((error) => {
				if (error.message === "Network Error") setHasErrorAPI(true)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [username])

	useEffect(() => {}, [animes])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchString(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)

		await api
			.post<SearchAnimeResponse>("/search/fetchQuery", {
				variables: {
					searchString: searchString,
					sort: "",
					format: "",
					page: 0,
				},
			})
			.then((res) => {
				setAnimes(res.data.data.Page.media)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	if (animes) {
		return (
			<>
				{user ? <Navbar user={user} /> : <Navbar />}

				<div className="search">
					<div className="header">
						<div className="header_container">
							<h1>
								Search <FontAwesomeIcon icon={faSearch} />
							</h1>
							<form
								action="submit"
								className="form"
								onSubmit={handleSubmit}
							>
								<input
									type="text"
									onChange={handleChange}
								/>
								<button type="submit">Submit</button>
							</form>
						</div>
					</div>

					<div className="icons_container">
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

					<div
						className={`result_container ${listViewStyle ? "list" : "grid"}`}
					>
						{animes.map((anime) => (
							<div
								className="result"
								key={anime.id}
							>
								{listViewStyle ? (
									<Link to={`/anime/${anime.id}`}>
										<div className="anime_item">
											<img
												src={anime.coverImage.large}
												alt=""
												className={`${getStatusAnime(user, anime, true, true)}`}
											/>
											<div className="content">
												<h2>{anime.title.english}</h2>

												<div className="status"></div>

												<div className="information">
													<p>Episodes: {anime.episodes}</p>

													<div className="score">
														<h3>Score: {anime.averageScore}</h3>
														<FontAwesomeIcon
															icon={faStar}
															size="xl"
														/>
													</div>
												</div>
											</div>
										</div>
									</Link>
								) : (
									<Link to={`/anime/${anime.id}`}>
										<div className="anime_item">
											<img
												src={anime.coverImage.large}
												alt=""
												className={`${getStatusAnime(user, anime, true, true)}`}
											/>
											<div
												className={`content ${
													getStatusAnime(user, anime, true, true) ? "with-margin" : ""
												}`}
											>
												<h2>{anime.title.english}</h2>
												<div className="information">
													<p>Episodes: {anime.episodes}</p>

													<div className="score">
														<p>Score: {anime.averageScore}</p>
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
							</div>
						))}
					</div>
				</div>

				<Loader isActive={isLoading} />
			</>
		)
	} else if (hasErrorAPI) {
		return <ApiError />
	}
}

export default Search
