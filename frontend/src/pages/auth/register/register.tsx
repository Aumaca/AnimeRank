import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons"

import Navbar from "../../../components/navbar/navbar.tsx"
import Modal from "../../../components/modal/modal.tsx"
import Message from "../../../components/message/message.tsx"
import Loader from "../../../components/loader/loader.tsx"
import checkForm from "./checkForm.ts"
import api from "../../../api/api.ts"

import { MessageProps } from "../../../interfaces/components/message.ts"
import {
	Country,
	RegisterFormData,
	RegisterFormDataError,
} from "../../../interfaces/register.ts"

import "../auth.css"

const Register = () => {
	const [formData, setFormData] = useState<RegisterFormData>({
		username: "",
		email: "",
		password: "",
		country: "",
	})

	const [formError, setFormError] = useState<RegisterFormDataError>({
		username: "",
		email: "",
		password: "",
		country: "",
	})

	const [messageState, setMessageState] = useState<MessageProps>({
		isOpen: false,
		title: "",
		backgroundColor: "",
		children: "",
	})

	const [isModalOpen, setIsModalOpen] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const [countries, setCountries] = useState<string[]>([])

	// Fetch countries for country field in form
	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await fetch("https://restcountries.com/v3.1/all")
				const data = await response.json()
				const countryNames = data.map((country: Country) => country.name.common)
				const sortedCountryNames = countryNames.sort((a: string, b: string) =>
					a.localeCompare(b)
				)
				setCountries(sortedCountryNames)
			} catch (error) {
				setMessageState({
					isOpen: true,
					backgroundColor: "#D2042D",
					title: "Error",
					children: "An error occurred when connecting to the server",
				})
			}
		}

		fetchCountries()
	}, [])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formIsValid: boolean = checkForm(formData, setFormError)
		if (!formIsValid) {
			return
		}

		setIsLoading(true)

		api
			.post("/auth/register", { ...formData })
			.then(() => {
				setIsModalOpen(true)
			})
			.catch((error) => {
				if (error.response?.status === 400) {
					const field = error.response.data.field
					const message = error.response.data.message
					setFormError((previousState) => ({
						...previousState,
						[field]: message,
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
				setIsLoading(false)
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
					<form
						onSubmit={handleSubmit}
						encType="multipart/form-data"
					>
						<div className="field">
							<label>Username</label>
							<input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleChange}
								className={`${formError.username ? "error" : ""}`}
							/>
							<label className="error">{formError.username}</label>
						</div>

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

						<div className="field">
							<label>Country</label>
							<select
								name="country"
								onChange={handleChange}
								value={formData.country}
								className={`${formError.country ? "error" : ""}`}
							>
								<option
									value=""
									disabled
								>
									Select a country
								</option>
								{countries.map((country, index) => (
									<option
										key={index}
										value={country}
									>
										{country}
									</option>
								))}
							</select>
							<label className="error">{formError.country}</label>
						</div>

						<button type="submit">Register</button>

						<Link
							to="/login"
							className="redirect"
						>
							Or login <FontAwesomeIcon icon={faArrowRight} />
						</Link>
					</form>
				</div>
			</div>
			<Modal
				isOpen={isModalOpen}
				backgroundColor={"#50C878"}
			>
				<FontAwesomeIcon
					icon={faCheckCircle}
					size="4x"
				/>
				<p>Registration successful! You can now log in.</p>
				<Link
					to="/login"
					className="modal_link"
				>
					<button>Go to Login</button>
				</Link>
			</Modal>
			<Message
				closeMessage={closeMessage}
				isOpen={messageState.isOpen}
				title={messageState.title}
				backgroundColor={messageState.backgroundColor}
			>
				{messageState.children}
			</Message>
			<Loader isActive={isLoading} />
		</>
	)
}

export default Register
