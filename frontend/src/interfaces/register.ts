export interface RegisterFormData {
	username: string
	email: string
	password: string
	country: string
}

export interface RegisterFormDataError {
	username: string
	email: string
	password: string
	country: string
}

export interface Country {
	name: {
		common: string
	}
}