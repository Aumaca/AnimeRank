import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import api from "../../api/api"
import { ProfileResponse, ProfilesResponse } from "../../interfaces/responses"
import { AuthState, ProfileState } from "../../interfaces/user"
import Loader from "../../components/loader/loader"
import Navbar from "../../components/navbar/navbar"

import "./profiles.css"
import { Link } from "react-router-dom"

const Profiles = () => {
	const usernameLogged = useSelector((state: AuthState) => state.username)
	const [user, setUser] = useState<ProfileState>()
	const [profiles, setProfiles] = useState<ProfileState[]>()
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		document.title = `Profiles - AnimeRank`

		api.get(`/user/getUser/${usernameLogged}`).then((res: ProfileResponse) => {
			setUser(res.data)
		})

		api.get(`/user/getUsers`).then((res: ProfilesResponse) => {
			setProfiles(res.data)
		})

		setIsLoading(false)
	}, [usernameLogged])

	const formattedDate = (date: string): string => {
		const newDate = new Date(date)
		return newDate.toLocaleDateString("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		})
	}

	return (
		<>
			{user ? <Navbar user={user} /> : <Navbar />}

			<div className="profiles">
				<div className="profiles_container">
					<h1>Profiles</h1>
				</div>

				<div className="profiles_list">
					{profiles?.map((profile) => (
						<Link to={`/profile/${profile.username}`} className="profile">
							<div className="username field">
								<span>Username:</span>
								<p>{profile.username}</p>
							</div>
							<div className="country field">
								<span>Country:</span>
								<p>{profile.country}</p>
							</div>
							<div className="createdAt field">
								<span>Created At:</span>
								<p>{formattedDate(profile.createdAt)}</p>
							</div>
							<div className="countEpisodes field">
								<span>Episodes watched:</span>
								<p>{profile.countEpisodes}</p>
							</div>
						</Link>
					))}
				</div>

				<Loader isActive={isLoading} />
			</div>
		</>
	)
}

export default Profiles
