/* eslint-disable no-mixed-spaces-and-tabs */
import { ChangeEvent, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import api from "../../api/api.ts"
import Loader from "../../components/loader/loader.tsx"
import Navbar from "../../components/navbar/navbar.tsx"
import ProfilePicture from "../../components/profilePicture/profilePicture.tsx"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBorderAll, faListUl } from "@fortawesome/free-solid-svg-icons"

import { AnimeType } from "../../interfaces/common.ts"
import { AuthState, ProfileState } from "../../interfaces/user.ts"
import { UserAndListResponse } from "../../interfaces/responses.ts"

import Page404 from "../../components/Page404/Page404.tsx"
import ApiError from "../../components/apiError/apiError.tsx"
import AnimeListGrid from "../../components/animeListGrid/animeListGrid.tsx"

import "./animeList.css"

const AnimeList = () => {
	const navigator = useNavigate()

	const params = new URLSearchParams(location.search)
	const statusParam = params.get("status")

	const usernameLogged = useSelector((state: AuthState) => state.username)
	const { username } = useParams()

	const [user, setUser] = useState<ProfileState | null>(null)
	const [userProfile, setUserProfile] = useState<ProfileState>()

	const [animes, setAnimes] = useState<AnimeType[]>()
	const [listViewStyle, setListViewStyle] = useState<boolean>(false)
	const [filter, setFilter] = useState<string>(statusParam ? statusParam : "")

	const [isLoading, setIsLoading] = useState(true)
	const [notFound, setNotFound] = useState<boolean>(false)
	const [hasErrorAPI, setHasErrorAPI] = useState<boolean>(false)

	useEffect(() => {
		document.title = `${username}'s AnimeList - AnimeRank`
		api.get(`/user/getUser/${usernameLogged}`).then((res) => {
			setUser(res.data)
		})

		api
			.get<UserAndListResponse>(
				`/user/getUserAndList/${username}${
					statusParam ? `?status=${statusParam}` : ""
				}`
			)
			.then((res) => {
				setUserProfile(res.data.user)
				setAnimes(res.data.animes)
			})
			.catch((err) => {
				if (err.response.status === 404) setNotFound(true)
				else setHasErrorAPI(true)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [username, usernameLogged, statusParam])

	useEffect(() => {
		setIsLoading(true)
	}, [filter])

	const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setFilter(event.target.value)
		const status = event.target.value
		if (status === "0") {
			return navigator(`/list/${userProfile?.username}`)
		} else {
			return navigator(
				`/list/${userProfile?.username}?${new URLSearchParams({
					status,
				}).toString()}`
			)
		}
	}

	if (userProfile && animes) {
		return (
			<>
				{user ? <Navbar user={user} /> : <Navbar />}

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

					<AnimeListGrid
						animes={animes}
						listViewStyle={listViewStyle}
						userAnimes={user && user.animes.length ? user.animes : null}
						userProfileAnimes={
							userProfile && userProfile.animes.length
								? userProfile.animes
								: null
						}
					/>
				</div>

				<Loader isActive={isLoading} />
			</>
		)
	} else if (hasErrorAPI) {
		return <ApiError />
	} else if (notFound) {
		return <Page404 />
	}
}

export default AnimeList
