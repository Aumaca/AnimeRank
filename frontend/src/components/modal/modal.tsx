import { FC } from "react"
import "./modal.css"
import { ModalProps } from "../../interfaces/components/modal"


const Modal: FC<ModalProps> = ({ isOpen, children, backgroundColor }) => {
	return (
		<div className={`modal-overlay ${isOpen ? "open" : ""}`}>
			<div
				className="modal-content"
				style={{ backgroundColor: backgroundColor }}
			>
				{children}
			</div>
		</div>
	)
}

export default Modal
