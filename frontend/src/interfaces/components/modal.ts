import { ReactNode } from "react"

export interface ModalProps {
	isOpen: boolean
	setIsOpen: (val: boolean) => void
	children: ReactNode
	backgroundColor: string
}
