import "./Page404.css"

import Navbar from "../navbar/navbar"
import image from "../../imgs/404.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons"

const Page404 = () => {
	return (
		<>
			<Navbar />
			<div className="container-404">
				<div className="text">
					<h1>Page not found!</h1>
					<h1>
						<FontAwesomeIcon icon={faFaceSadTear} />
					</h1>
				</div>
				<div>
					<img
						src={image}
						alt=""
					/>
				</div>
			</div>
		</>
	)
}

export default Page404
