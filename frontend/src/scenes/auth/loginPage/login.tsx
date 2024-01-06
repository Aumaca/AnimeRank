import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import type { Dispatch } from "redux"
import { Link, useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

import Navbar from "../../../components/navbar/navbar.tsx"
import Loader from "../../../components/loader/loader.tsx"
import Message from "../../../components/message/message.tsx"
import { setLogin } from "../../../state/index.ts"
import api from "../../../api/api.ts"

import { MessageProps } from "../../../interfaces/components/message.ts"

import "../auth.css"

const initialFormErrorState = {
	email: "",
	password: "",
}

const Login = () => {
	const dispatch: Dispatch = useDispatch()
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})

	const [formError, setFormError] = useState({
		email: "",
		password: "",
	})

	const [messageState, setMessageState] = useState<MessageProps>({
		isOpen: false,
		title: "",
		backgroundColor: "",
		children: "",
	})

	const [isLoaderOpen, setIsLoaderOpen] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const checkForm = (): boolean => {
		setFormError(initialFormErrorState)
		let isValid = true

		// email
		const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
		const isEmailValid = emailRegex.test(formData.email)
		if (!isEmailValid) {
			setFormError((prevFormError) => ({
				...prevFormError,
				email: "Email invalid",
			}))
			isValid = false
		}

		// password
		if (formData.password.length < 8) {
			setFormError((prevFormError) => ({
				...prevFormError,
				password: "Password with less than 8 characters",
			}))
			isValid = false
		}

		return isValid
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formIsValid: boolean = checkForm()
		if (!formIsValid) {
			return
		}

		setIsLoaderOpen(true)
		api
			.post("/auth/login", { ...formData })
			.then((response) => {
				dispatch(
					setLogin({
						token: response.data.token,
					})
				)
				return navigate("/")
			})
			.catch((error) => {
				if (error.response?.status === 400) {
					const field = error.response.data.field
					const field2 = error.response.data.field2
					const message = error.response.data.message
					setFormError((previousState) => ({
						...previousState,
						[field]: message,
						[field2]: message,
					}))
				} else {
					setMessageState({
						isOpen: true,
						backgroundColor: "#D2042D",
						title: "Error",
						children: "An error occurred when connecting to the server",
					})
				}
			})
			.finally(() => {
				setIsLoaderOpen(false)
			})
	}

	const closeMessage = (): void => {
		setMessageState({ ...messageState, isOpen: false })
	}

	return (
		<>
			<Navbar />
			<div className="auth">
				<div className="container">
					<form onSubmit={handleSubmit}>
						<div className="field">
							<label>Email</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className={`${formError.email ? "error" : ""}`}
							/>
							<label className="error">{formError.email}</label>
						</div>

						<div className="field">	
							<label>Password</label>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className={`${formError.password ? "error" : ""}`}
							/>
							<label className="error">{formError.password}</label>
						</div>

						<button type="submit">Login</button>

						<Link
							to="/register"
							className="redirect"
						>
							Or register <FontAwesomeIcon icon={faArrowRight} />
						</Link>
					</form>
				</div>
			</div>
			<Message
				closeMessage={closeMessage}
				isOpen={messageState.isOpen}
				title={messageState.title}
				backgroundColor={messageState.backgroundColor}
			>
				{messageState.children}
			</Message>
			<Loader isActive={isLoaderOpen} />
		</>
	)
}

export default Login
