import { RegisterFormData, RegisterFormDataError } from "../../../interfaces/register"

const initialFormErrorState: RegisterFormDataError = {
	username: "",
	email: "",
	password: "",
	country: "",
}

// Returns a bool to indicate if form is valid or not
const checkForm = (
	formData: RegisterFormData,
	setFormError: React.Dispatch<React.SetStateAction<RegisterFormDataError>>
): boolean => {
	setFormError(initialFormErrorState)

	let isValid = true

	// username
	if (formData.username.length === 0) {
		setFormError((prevState) => ({
			...prevState,
			username: "Username invalid",
		}))
		isValid = false
	}

	// email
	const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
	const isEmailValid = emailRegex.test(formData.email)
	if (!isEmailValid) {
		setFormError((prevState) => ({ ...prevState, email: "Email invalid" }))
		isValid = false
	}

	// password
	if (formData.password.length < 8) {
		setFormError((prevState) => ({
			...prevState,
			password: "Password with less than 8 characters",
		}))
		isValid = false
	}

	// country
	if (formData.country === "") {
		setFormError((prevState) => ({ ...prevState, country: "Select a country" }))
		isValid = false
	}

	return isValid
}

export default checkForm
