import { Link } from "react-router-dom"
import type { Dispatch } from "redux"
import { useDispatch } from "react-redux"

import { setLogout } from "../../../state"
import ProfilePicture from "../../../components/profilePicture/profilePicture.tsx"
import { userDropdownProps } from "../../../schemas/components/userDropdown.ts"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser"
import { faList, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

import "./userDropdown.css"

const UserDropdown = ({ isActive, user }: userDropdownProps) => {
	const dispatcher: Dispatch = useDispatch()

	const logoutUser = () => {
		dispatcher(setLogout())
	}

	return (
		<div className={`userDropdown ${isActive ? "active" : ""}`}>
			<div className="userDropdown_container">
				<div className="username">
					<h2>{user.username}</h2>
				</div>
				<div className="picture">
					<ProfilePicture
						image={user.picture}
						size={60}
					/>
				</div>

				<Link
					to={`/profile/${user.username}`}
					className="item"
				>
					<FontAwesomeIcon icon={faUser} />
					My profile
				</Link>
				<Link
					to="/"
					className="item"
				>
					<FontAwesomeIcon icon={faList} />
					My anime list
				</Link>
				<a
					className="item"
					onClick={() => logoutUser()}
				>
					<FontAwesomeIcon icon={faRightFromBracket} />
					Logout
				</a>
			</div>
		</div>
	)
}

export default UserDropdown
