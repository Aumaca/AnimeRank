import "./footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"

const Footer = () => {
	return (
		<footer>
			<div className="footer">
				Made by <a href="https://github.com/Aumaca" target="_blank">Carlos Augusto</a>
				<FontAwesomeIcon icon={faLink} />
			</div>
		</footer>
	)
}

export default Footer
