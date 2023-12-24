import "./navbar.css"
import Sidemenu from "./sidemenu"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser"
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import Logo from "../../../src/imgs/Logo.png"

const Navbar = () => {
  const [sidemenuActive, setSidemenuActive] = useState(false)

  return (
    <>
      <nav className={`${sidemenuActive ? "active" : ""}`}>
        <div className="container">
          <div className="options">
            <FontAwesomeIcon className="options_icon" icon={faBars} size="2x" onClick={() => setSidemenuActive(!sidemenuActive)} />
          </div>
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <div className="user">
            <FontAwesomeIcon icon={faUser} size="2x" />
          </div>
        </div>
        <Sidemenu isActive={sidemenuActive} />
      </nav>
    </>
  )
}

export default Navbar