import "./sidemenu.css"
import { Link } from "react-router-dom"

const Sidemenu = ({ isActive, username }: { isActive: boolean, username: string }) => {
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
					to="/"
					className="item"
				>
					Top Animes
				</Link>
				<Link
					to="/"
					className="item"
				>
					Most Popular Animes
				</Link>
				<Link
					to={`/profile/${username}`}
					className="item"
				>
					My Profile
				</Link>
			</div>
		</>
	)
}

export default Sidemenu
