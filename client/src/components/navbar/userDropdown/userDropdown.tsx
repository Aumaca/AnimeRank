import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser"
import { faList, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import ProfilePicture from "../../../components/profilePicture/profilePicture.tsx"
import { useSelector, useDispatch } from "react-redux"
import type { Dispatch } from "redux"
import { setLogin } from "../../../state"
import { AuthState } from "../../../state"

import "./userDropdown.css"

interface userDropdownProps {
	isActive: boolean
}

const UserDropdown = ({ isActive }: userDropdownProps) => {
	const dispatcher: Dispatch = useDispatch()

	const isAuth = Boolean(useSelector((state: AuthState) => state.token))
	const picture = useSelector((state: AuthState) => state.user?.picture || null)
	const user = useSelector(
		(state: AuthState) => state.user || null
	)

	const logoutUser = () => {
		dispatcher(
			setLogin({
				user: null,
				token: null,
			})
		)
	}

	return (
		<>
			<div className={`userDropdown ${isActive ? "active" : ""}`}>
				<div className="userDropdown_container">
					{isAuth ? (
						<>
							<div className="username">
								<h2>{user!.username}</h2>
							</div>
							<div className="picture">
								<ProfilePicture
									image={picture}
									size={60}
								/>
							</div>
						</>
					) : (
						""
					)}

					<Link
						to={`/profile/${user!._id}`}
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
		</>
	)
}

export default UserDropdown
