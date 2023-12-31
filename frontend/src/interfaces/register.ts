export interface RegisterFormData {
	username: string
	email: string
	password: string
	country: string
	picture: File | null
}

export interface RegisterFormDataError {
	username: string
	email: string
	password: string
	country: string
	picture: string
}

export interface Country {
	name: {
		common: string
	}
}