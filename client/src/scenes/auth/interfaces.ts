export interface Country {
	name: {
		common: string
	}
}

export interface FormDataState {
	username: string
	email: string
	password: string
	country: string
	picture: File | null
}

export interface FormErrorState {
	username: string
	email: string
	password: string
	country: string
	picture: string
}

export interface MessageState {
	isOpen: boolean
	title: string
	backgroundColor: string
	children: string
}
