import { FC, useEffect, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"

import {
	FormAnimeProps,
	FormAnimeData,
	FormAnimeDataError,
} from "../../interfaces/components/formAnime"
import Message from "../message/message"
import Loader from "../loader/loader"
import api from "../../api/api.ts"

import { scoreLabels, status } from "../../interfaces/user"
import { MessageProps } from "../../interfaces/components/message.ts"

import "./formAnime.css"

const FormAnime: FC<FormAnimeProps> = ({ isOpen, anime, closeForm }) => {
	const initialFormData: FormAnimeData = {
		id: anime ? anime.id : "",
		status: "",
		episodes: 0,
		score: 10,
		notes: "",
		isFavorite: "No",
	}

	const initialFormAnimeDataError: FormAnimeDataError = {
		status: "",
		episodes: "",
		score: "",
		notes: "",
	}

	const disableInput = (): boolean => {
		return (
			formAnimeData.status === status[1] || formAnimeData.status === status[4]
		)
	}

	const [formAnimeData, setFormAnimeData] =
		useState<FormAnimeData>(initialFormData)
	const [formAnimeDataError, setFormAnimeDataError] =
		useState<FormAnimeDataError>(initialFormAnimeDataError)
	const [isLoading, setIsLoading] = useState(false)
	const [messageState, setMessageState] = useState<MessageProps>({
		isOpen: false,
		title: "",
		backgroundColor: "",
		children: "",
	})

	useEffect(() => {
		if (anime)
			setFormAnimeData({
				...formAnimeData,
				id: anime!.id,
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [anime])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		if (value === status[1]) {
			setFormAnimeData((prevData) => ({
				...prevData,
				episodes: anime!.episodes,
				[name]: value,
			}))
		} else if (value === status[4]) {
			setFormAnimeData((prevData) => ({
				...prevData,
				episodes: 0,
				[name]: value,
			}))
		} else {
			setFormAnimeData((prevData) => ({
				...prevData,
				[name]: value,
			}))
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setIsLoading(true)
		api
			.post(`/user/addAnime`, { formAnimeData: formAnimeData, anime: anime })
			.then(() => {
				setMessageState({
					isOpen: true,
					backgroundColor: "green",
					title: "Anime added to your list!",
					children: "Anime added to your list successfully",
				})
			})
			.catch((error) => {
				if (error.response?.status === 400) {
					const field = error.response.data.field
					const message = error.response.data.message
					setFormAnimeDataError((previousState) => ({
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
			{anime ? (
				<>
					<div className={`form_anime-overlay ${isOpen ? "open" : ""}`}>
						<div className="form_anime">
							<div
								className="close_button"
								onClick={() => {
									closeForm()
									setFormAnimeData(initialFormData)
									setFormAnimeDataError(initialFormAnimeDataError)
								}}
							>
								<button>
									<FontAwesomeIcon
										icon={faClose}
										size="2x"
									/>
								</button>
							</div>
							<h1 className="title">{anime!.title.english}</h1>
							<form onSubmit={handleSubmit}>
								{/* STATUS FIELD */}
								<div className="field">
									<label>Status</label>
									<select
										name="status"
										onChange={handleChange}
										value={formAnimeData.status}
										className={`${formAnimeDataError.status ? "error" : ""}`}
									>
										<option
											key={0}
											value={"-----"}
										>
											{"-----"}
										</option>
										{status.map((value, key) => (
											<option
												key={key}
												value={value}
											>
												{value}
											</option>
										))}
									</select>
									<label className="error">{formAnimeDataError.status}</label>
								</div>

								{/* EPISODES FIELD */}
								<div className="field episodes">
									<label>Episodes Watched</label>
									<div>
										<input
											disabled={disableInput()}
											type="number"
											name="episodes"
											value={formAnimeData.episodes}
											onChange={handleChange}
											className={`${
												formAnimeDataError.episodes ? "error" : ""
											}`}
										/>
										<h1>/ {anime.episodes}</h1>
									</div>
									<label className="error">{formAnimeDataError.episodes}</label>
								</div>

								{/* SCORE FIELD */}
								<div className="field">
									<label>Your Score</label>
									<select
										name="score"
										onChange={handleChange}
										value={formAnimeData.score}
										className={`${formAnimeDataError.score ? "error" : ""}`}
									>
										<option
											key={0}
											value={"-----"}
										>
											{"-----"}
										</option>
										{Object.entries(scoreLabels)
											.reverse()
											.map(([key]) => (
												<option
													key={key}
													value={key}
												>
													{scoreLabels[parseInt(key)]}
												</option>
											))}
									</select>
									<label className="error">{formAnimeDataError.score}</label>
								</div>

								{/* NOTES FIELD */}
								<div className="field">
									<label>Notes</label>
									<input
										type="text"
										name="notes"
										value={formAnimeData.notes}
										onChange={handleChange}
										maxLength={100}
									/>
									<label className="error">{formAnimeDataError.notes}</label>
								</div>

								{/* FAVORITE FIELD */}
								<div className="field">
									<label>Is favorite?</label>
									<select
										name="isFavorite"
										onChange={handleChange}
										value={formAnimeData.isFavorite}
									>
										<option
											key={0}
											value={"No"}
										>
											{"No"}
										</option>
										<option
											key={1}
											value={"Yes"}
										>
											{"Yes"}
										</option>
									</select>
								</div>

								<button
									type="submit"
									className="submit"
								>
									<h3>Submit</h3>
								</button>
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
					<Loader isActive={isLoading} />
				</>
			) : (
				<></>
			)}
		</>
	)
}

export default FormAnime
