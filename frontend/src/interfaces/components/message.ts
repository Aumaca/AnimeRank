import { ReactNode } from "react"

export interface MessageProps {
	isOpen: boolean
	title: string
	children: ReactNode
	backgroundColor: string
	closeMessage?: VoidFunction
}
