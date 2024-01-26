import { ChangeEvent, useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Loader from "../../components/loader/loader"
import Navbar from "../../components/navbar/navbar"
import { useSelector } from "react-redux"
import api from "../../api/api"
import { AnimeType } from "../../interfaces/common"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import {
	ProfileResponse,
	SearchAnimeResponse,
} from "../../interfaces/responses"
import { AuthState, ProfileState, UserState } from "../../interfaces/user"

import ApiError from "../../components/apiError/apiError.tsx"
import AnimeListGrid from "../../components/animeListGrid/animeListGrid.tsx"

import "./search.css"

const Search = () => {
	const username = useSelector((state: AuthState) => state.username)
	const [user, setUser] = useState<ProfileState | UserState | null>(null)
	const [isLoading, setIsLoading] = useState(true)

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
				<Helmet>
					<title>Search - AnimeRank</title>
				</Helmet>
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

					<AnimeListGrid
						animes={animes}
						listViewStyle={false}
						userAnimes={user && user.animes.length ? user.animes : null}
					/>
				</div>

				<Loader isActive={isLoading} />
			</>
		)
	} else if (hasErrorAPI) {
		return <ApiError />
	}
}

export default Search
