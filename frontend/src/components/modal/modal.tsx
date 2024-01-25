import { FC, useEffect, useRef } from "react"
import "./modal.css"
import { ModalProps } from "../../interfaces/components/modal"

const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, children, backgroundColor }) => {
	const modalRef: React.RefObject<HTMLDivElement> = useRef(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [modalRef, setIsOpen])
	
	return (
		<div className={`modal-overlay ${isOpen ? "open" : ""}`}>
			<div
				ref={modalRef}
				className="modal-content"
				style={{ backgroundColor: backgroundColor }}
			>
				{children}
			</div>
		</div>
	)
}

export default Modal
