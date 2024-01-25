import "./apiError.css"

import image from "../../imgs/404.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons"
import Navbar from "../navbar/navbar"

const ApiError = () => {
	return (
		<>
			<Navbar />
			<div className="apierror">
				<div className="text">
					<h1>
						The anime data server is down due the number of requests made by
						this website! Sorry for the incovenience...
					</h1>
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

export default ApiError
