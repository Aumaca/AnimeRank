import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import type { Dispatch } from "redux"
import { setLogin } from "../../state/index.ts"
import { AuthState } from "../../interfaces/user.ts"
import ProfilePicture from "../../components/profilePicture/profilePicture.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import api from "../../api/api.ts"
import Navbar from "../../components/navbar/navbar.tsx"
import Message from "../../components/message/message.tsx"

import "./profile.css"
import { useState } from "react"
import { MessageState } from "../../interfaces/components/message.ts"

const Profile = () => {
	const dispatcher: Dispatch = useDispatch()
	const user = useSelector((state: AuthState) => state.user)

	const [messageState, setMessageState] = useState<MessageState>({
		isOpen: false,
		title: "",
		backgroundColor: "",
		children: "",
	})

	const closeMessage = (): void => {
		setMessageState({ ...messageState, isOpen: false })
	}

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
				{user ? (
					<>
						<div className="username_container">
							<h1>Profile</h1>
						</div>
						<div className="user">
							<div className="picture">
								<ProfilePicture
									image={user.picture}
									size={100}
									classname="rounded"
								/>
							</div>
							<div className="username">
								<h1>{user.username}</h1>
								<Link to="/">
									<button>Anime List</button>
								</Link>
							</div>
						</div>

						<div className="anime_stats">
							<h1>Anime Stats</h1>

							<div className="stats_container">
								<div className="col1">
									<ul>
										<li>
											<Link to={"/"}>Watching</Link>
											<span>{user.animes.length}</span>
										</li>
										<li>
											<Link to={"/"}>Completed</Link>
											<span>{user.animes.length}</span>
										</li>
										<li>
											<Link to={"/"}>On-Hold</Link>
											<span>{user.animes.length}</span>
										</li>
										<li>
											<Link to={"/"}>Dropped</Link>
											<span>{user.animes.length}</span>
										</li>
										<li>
											<Link to={"/"}>Plan to Watch</Link>
											<span>{user.animes.length}</span>
										</li>
									</ul>
								</div>
								<div className="col2">
									<ul>
										<li>
											<p>Total Animes</p>
											<span>{user.animes.length}</span>
										</li>
										<li>
											<p>Episodes</p>
											<span>{user.animes.length}</span>
										</li>
									</ul>
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
						<h1>ERROR!!!</h1>
					</>
				)}
			</div>
		</>
	)
}

export default Profile
