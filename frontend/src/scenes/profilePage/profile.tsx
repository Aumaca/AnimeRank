import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import type { Dispatch } from "redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import api from "../../api/api.ts"
import Navbar from "../../components/navbar/navbar.tsx"
import Message from "../../components/message/message.tsx"
import Loader from "../../components/loader/loader.tsx"
import ProfilePicture from "../../components/profilePicture/profilePicture.tsx"
import { setLogin } from "../../state/index.ts"

import { ProfileState } from "../../interfaces/user.ts"
import { ProfileResponse } from "../../interfaces/responses.ts"
import { MessageProps } from "../../interfaces/components/message.ts"

import "./profile.css"

const Profile = () => {
	const dispatcher: Dispatch = useDispatch()
	const { userId } = useParams()

	const [userProfile, setUserProfile] = useState<ProfileState>()

	const [isLoading, setIsLoading] = useState(false)

	const [messageState, setMessageState] = useState<MessageProps>({
		isOpen: false,
		title: "",
		backgroundColor: "",
		children: "",
	})

	const closeMessage = (): void => {
		setMessageState({ ...messageState, isOpen: false })
	}

	useEffect(() => {
		api
			.get(`/social/${userId}`)
			.then((res: ProfileResponse) => {
				setUserProfile(res.data)
				setIsLoading(false)
			})
			.catch((err) => {
				console.log("error!", err.message)
			})
	}, [userId])

	const deleteUser = (): void => {
		api
			.delete("/user/deleteUser")
			.then(() => {
				dispatcher(
					setLogin({
						user: null,
						token: null,
					})
				)
			})
			.catch(() => {
				setMessageState({
					isOpen: true,
					backgroundColor: "#D2042D",
					title: "Error",
					children: "An error occurred when deleting the user",
				})
			})
	}

	return (
		<>
			<Navbar />

			<div className="profile">
				{userProfile ? (
					<>
						<div className="username_container">
							<h1>Profile</h1>
						</div>
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
								<Link to="/">
									<button>Anime List</button>
								</Link>
							</div>
						</div>

						<div className="anime_stats_container">
							<div className="anime_stats">
								<h1>Anime Stats</h1>

								<div className="anime_stats_bar">{}</div>

								<div className="stats_container">
									<div className="col1">
										<ul>
											<li>
												<Link to={`/${userId}/list/1}`}>Watching</Link>
												<span>{userProfile.statusData.watching}</span>
											</li>
											<li>
												<Link to={`/${userId}/list/2}`}>Completed</Link>
												<span>{userProfile.statusData.completed}</span>
											</li>
											<li>
												<Link to={`/${userId}/list/3}`}>On-Hold</Link>
												<span>{userProfile.statusData.onHold}</span>
											</li>
											<li>
												<Link to={`/${userId}/list/4}`}>Dropped</Link>
												<span>{userProfile.statusData.dropped}</span>
											</li>
											<li>
												<Link to={`/${userId}/list/5}`}>Plan to Watch</Link>
												<span>{userProfile.statusData.planToWatch}</span>
											</li>
										</ul>
									</div>
									<div className="col2">
										<ul>
											<li>
												<p>Total Animes</p>
												<span>{userProfile.animes.length}</span>
											</li>
											<li>
												<p>Episodes</p>
												<span>{userProfile.countEpisodes}</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div className="delete">
							<button onClick={() => deleteUser()}>
								Delete profile <FontAwesomeIcon icon={faTrash} />
							</button>
						</div>
						<Message
							closeMessage={closeMessage}
							isOpen={messageState.isOpen}
							title={messageState.title}
							backgroundColor={messageState.backgroundColor}
						>
							{messageState.children}
						</Message>
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

export default Profile
