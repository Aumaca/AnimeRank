import "./navbar.css"
import Sidemenu from "./sidemenu/sidemenu"
import UserDropdown from "./userDropdown/userDropdown.tsx"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser"
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import { Link } from "react-router-dom"
import Logo from "../../../src/imgs/Logo.png"

const Navbar = () => {
  const [sidemenuActive, setSidemenuActive] = useState(false)
  const [userDropdownActive, setUserDropdownActive] = useState(false)

  return (
    <>
      <nav className={`${sidemenuActive ? "active" : ""}`}>
        <div className="container">
          <div className="options">
            <FontAwesomeIcon className="options_icon" icon={faBars} size="2x" onClick={() => setSidemenuActive(!sidemenuActive)} />
          </div>
          <div className="logo">
            <Link to="/"><img src={Logo} alt="" /></Link>
          </div>
          <div className="user">
            <FontAwesomeIcon icon={faUser} size="2x" onClick={() => setUserDropdownActive(!userDropdownActive)} />
            <UserDropdown isActive={userDropdownActive} />
          </div>
        </div>
        <Sidemenu isActive={sidemenuActive} />
      </nav>
    </>
  )
}

export default Navbar