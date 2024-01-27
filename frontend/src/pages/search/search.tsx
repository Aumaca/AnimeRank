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
import { useNavigate } from "react-router"
import {
	optionsNames,
	options,
	sortOptions,
	statusOptions,
	formatOptions,
} from "./searchFilter.ts"

type ParamsInterface = {
	query: string | null
	sort: string | null
	status: string | null
	format: string | null
}

type FilterState = {
	sort: string
	status: string
	format: string
}

const initialFilterState: FilterState = {
	sort: "",
	status: "",
	format: "",
}

const Search = () => {
	const navigator = useNavigate()

	// PARAMS
	const urlParams = new URLSearchParams(location.search.split("?")[1])
	const params: ParamsInterface = {
		query: urlParams.get("q"),
		sort: urlParams.get("sort"),
		status: urlParams.get("status"),
		format: urlParams.get("format"),
	}

	// FILTERS
	const [queryString, setQueryString] = useState<string>("")
	const [filter, setFilter] = useState<FilterState>(initialFilterState)

	const username = useSelector((state: AuthState) => state.username)
	const [user, setUser] = useState<ProfileState | UserState | null>(null)
	const [isLoading, setIsLoading] = useState(true)

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

		// Get animes
		let urlToApi = "/search?"
		if (params.query) {
			urlToApi += `q=${params.query}&`
			setQueryString(params.query)
		}
		if (params.sort) urlToApi += `sort=${params.sort}&`
		if (params.status) urlToApi += `status=${params.status}&`
		if (params.format) urlToApi += `format=${params.format}&`

		if (urlToApi.split("?")[1]) {
			api
				.get<SearchAnimeResponse>(urlToApi)
				.then((res) => {
					setAnimes(res.data.data.Page.media)
				})
				.finally(() => {
					setIsLoading(false)
				})
		}
	}, [params.query, params.sort, params.status, params.format, username])

	useEffect(() => {}, [animes])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQueryString(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
		e?.preventDefault()
		let redirectUrl = "/search?"
		if (queryString) redirectUrl += `q=${queryString}&`
		if (filter?.sort && filter.sort !== sortOptions[0])
			redirectUrl += `sort=${filter?.sort}&`
		if (filter?.status) redirectUrl += `status=${filter?.status}&`
		if (filter?.format) redirectUrl += `format=${filter?.format}&`
		navigator(redirectUrl)
	}

	const handleFastQuery = (type: string) => {
		let redirectUrl = "/search?"
		switch (type) {
			case "Top Animes":
				redirectUrl += "sort=POPULARITY_DESC&"
				break
			case "Most Scored":
				redirectUrl += "sort=SCORE_DESC&"
				break
			case "Releasing":
				redirectUrl += "status=RELEASING"
				break
		}
		setQueryString("")
		navigator(redirectUrl)
	}

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		setFilter((prevData) => ({
			...prevData,
			[name]: value,
		}))
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
									value={queryString}
								/>
								<button type="submit">Submit</button>
							</form>

							<div className="fast_querys">
								<div
									className="query green"
									onClick={() => handleFastQuery("Top Animes")}
								>
									<h3>Top Animes</h3>
								</div>
								<div
									className="query blue"
									onClick={() => handleFastQuery("Most Scored")}
								>
									<h3>Most Scored</h3>
								</div>
								<div
									className="query yellow"
									onClick={() => handleFastQuery("Releasing")}
								>
									<h3>Releasing</h3>
								</div>
							</div>

							<div className="filters">
								{optionsNames.map((optionName, i) => (
									<div
										className="filter"
										key={i}
									>
										<div className="label">
											<h3>{optionName}</h3>
										</div>
										<select
											name={optionName.toLowerCase()}
											onChange={handleFilterChange}
											value={filter[optionName as keyof FilterState]}
										>
											{options[i].map((option, j) => (
												<option
													key={j + i}
													value={option}
													defaultValue={j === 0 ? option : undefined}
												>
													{option ? option.split("_").join(" ") : "-----"}
												</option>
											))}
										</select>
									</div>
								))}
							</div>
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
