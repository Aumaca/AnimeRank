import "./sidemenu.css"
import { Link } from "react-router-dom"

const Sidemenu = ({
	isActive,
	username,
}: {
	isActive: boolean
	username?: string
}) => {
	return (
		<>
			<div className={`sidemenu ${isActive ? "active" : ""}`}>
				<Link
					to="/search"
					className="item"
				>
					Search
				</Link>
				<Link
					to="/"
					className="item"
				>
					Homepage
				</Link>
				<Link
					to="/search?sort=SCORE_DESC"
					className="item"
				>
					Top Animes
				</Link>
				<Link
					to="/search?sort=POPULARITY_DESC"
					className="item"
				>
					Popular Animes
				</Link>
				<Link
					to="/search?status=RELEASING"
					className="item"
				>
					Releasing Animes
				</Link>
				<Link
					to="/profiles"
					className="item"
				>
					Profiles
				</Link>
				{username ? (
					<Link
						to={`/profile/${username}`}
						className="item"
					>
						My Profile
					</Link>
				) : (
					""
				)}
			</div>
		</>
	)
}

export default Sidemenu
