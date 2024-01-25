import { useState } from "react"
import { ProfileState } from "../../interfaces/user.ts"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faBars, faUserSecret } from "@fortawesome/free-solid-svg-icons"

import Sidemenu from "./sidemenu/sidemenu"
import UserDropdown from "./userDropdown/userDropdown.tsx"
import Logo from "../../../src/imgs/Logo.png"

import "./navbar.css"

type UserBasicState<T> = Omit<
	T,
	"favoriteAnimes" | "countEpisodes" | "statusData"
>

const Navbar = ({
	user,
	isForHome,
}: {
	user?: UserBasicState<ProfileState>
	isForHome?: boolean
}) => {
	const [sidemenuActive, setSidemenuActive] = useState(false)
	const [userDropdownActive, setUserDropdownActive] = useState(false)

	return (
		<header className={`${isForHome && "forHome"}`}>
			<nav className={`${sidemenuActive ? "active" : ""}`}>
				<div className="container">
					<div className="options">
						<FontAwesomeIcon
							className="options_icon"
							icon={faBars}
							size="3x"
							onClick={() => setSidemenuActive(!sidemenuActive)}
						/>
					</div>
					<div className="logo">
						<Link to="/">
							<img
								src={Logo}
								alt=""
							/>
						</Link>
					</div>
					<div className="user">
						<FontAwesomeIcon
							className="user_icon"
							icon={user ? faUser : faUserSecret}
							size="3x"
							onClick={() => setUserDropdownActive(!userDropdownActive)}
						/>
						<UserDropdown
							isActive={userDropdownActive}
							user={user && user}
						/>
					</div>
				</div>
				<Sidemenu
					isActive={sidemenuActive}
					username={user && user.username}
				/>
			</nav>
		</header>
	)
}

export default Navbar
