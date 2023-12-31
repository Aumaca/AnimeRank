import "./sidemenu.css"
import { Link } from "react-router-dom"

const Sidemenu = ({ isActive, id }: { isActive: boolean, id: string }) => {
	return (
		<>
			<div className={`sidemenu ${isActive ? "active" : ""}`}>
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
					to={`/profile/${id}`}
					className="item"
				>
					My Profile
				</Link>
			</div>
		</>
	)
}

export default Sidemenu
