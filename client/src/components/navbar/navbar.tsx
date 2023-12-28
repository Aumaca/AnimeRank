import { useState } from "react"
import { useSelector } from "react-redux"
import { AuthState } from "../../state/index.ts"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons"

import Sidemenu from "./sidemenu/sidemenu"
import UserDropdown from "./userDropdown/userDropdown.tsx"
import Logo from "../../../src/imgs/Logo.png"

import "./navbar.css"

const Navbar = () => {
	const [sidemenuActive, setSidemenuActive] = useState(false)
	const [userDropdownActive, setUserDropdownActive] = useState(false)
	const isAuth = Boolean(useSelector((state: AuthState) => state.token))

	return (
		<header>
			{isAuth ? (
				<nav className={`${sidemenuActive ? "active" : ""}`}>
					<div className="container">
						<div className="options">
							<FontAwesomeIcon
								className="options_icon"
								icon={faBars}
								size="2x"
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
								icon={faUser}
								size="2x"
								onClick={() => setUserDropdownActive(!userDropdownActive)}
							/>
							<UserDropdown isActive={userDropdownActive} />
						</div>
					</div>
					<Sidemenu isActive={sidemenuActive} />
				</nav>
			) : (
				<nav>
					<div className="container">
						<div></div>
						<div className="logo">
							<Link to="/">
								<img
									src={Logo}
									alt=""
								/>
							</Link>
						</div>
						<div></div>
					</div>
				</nav>
			)}
		</header>
	)
}

export default Navbar
