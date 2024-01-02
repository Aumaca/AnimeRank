import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { AuthState } from "../../interfaces/user.ts"
import ProfilePicture from "../../components/profilePicture/profilePicture.tsx"

import Navbar from "../../components/navbar/navbar.tsx"

import "./profile.css"

const Homepage = () => {
	const user = useSelector((state: AuthState) => state.user)
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

export default Homepage
