import { FC, ReactNode } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import "./message.css"

interface MessageProps {
	isOpen: boolean
	title: string
	children: ReactNode
	backgroundColor: string
	closeMessage: VoidFunction
}

const Message: FC<MessageProps> = ({
	isOpen,
	title,
	children,
	backgroundColor,
	closeMessage,
}) => {
	return (
		<div
			className={`message ${isOpen ? "open" : ""}`}
			onClick={closeMessage}
		>
			<div
				className="message-container"
				style={{ backgroundColor: backgroundColor }}
			>
				<div className="message-content">
					<h4>{title}</h4>
					<p>{children}</p>
				</div>
				<div className="message-close">
					<FontAwesomeIcon
						icon={faClose}
						size="2x"
					/>
				</div>
			</div>
		</div>
	)
}

export default Message
