import { Link, useNavigate } from "react-router-dom"
import type { Dispatch } from "redux"
import { useDispatch } from "react-redux"

import { setLogout } from "../../../state/auth.ts"
import ProfilePicture from "../../../components/profilePicture/profilePicture.tsx"
import { userDropdownProps } from "../../../interfaces/components/userDropdown.ts"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser"
import { faList, faRightFromBracket, faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons"

import "./userDropdown.css"

const UserDropdown = ({ isActive, user }: userDropdownProps) => {
	const dispatcher: Dispatch = useDispatch()
	const navigator = useNavigate()

	const logoutUser = () => {
		dispatcher(setLogout())
		return navigator(`/login`)
	}

	if (user) {
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
						to={`/list/${user.username}`}
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
	} else {
		return (
			<div className={`userDropdown ${isActive ? "active" : ""}`}>
				<div className="userDropdown_container">
					<Link
						to={`/register`}
						className="item"
					>
						<FontAwesomeIcon icon={faUserPlus} />
						Register
					</Link>
					<Link
						to={`/login`}
						className="item"
					>
						<FontAwesomeIcon icon={faRightToBracket} />
						Login
					</Link>
				</div>
			</div>
		)
	}
}

export default UserDropdown
