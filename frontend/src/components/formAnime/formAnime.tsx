import { FC, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import {
	FormAnimeProps,
	FormAnimeData,
	FormAnimeDataError,
} from "../../interfaces/components/formAnime"

import "./formAnime.css"

const initialFormData: FormAnimeData = {
	id: "",
	title: "",
	status: "",
	episodes: 0,
	score: 0,
	startDate: {
		month: "",
		day: "",
		year: "",
	},
	endDate: {
		month: "",
		day: "",
		year: "",
	},
	notes: "",
}

const initialFormDataError: FormAnimeDataError = {
	id: "",
	title: "",
	status: "",
	episodes: "",
	score: "",
	startDate: "",
	endDate: "",
	notes: "",
}

const FormAnime: FC<FormAnimeProps> = ({ isOpen, anime, closeForm }) => {
	const [formData, setFormData] = useState<FormAnimeData>(initialFormData)
	const [formDataError, setFormDataError] =
		useState<FormAnimeDataError>(initialFormDataError)

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
	}

	return (
		<>
			{anime ? (
				<div className={`form_anime-overlay ${isOpen ? "open" : ""}`}>
					<div className="form_anime">
						<div
							className="close_button"
							onClick={() => closeForm()}
						>
							<button>
								<FontAwesomeIcon
									icon={faClose}
									size="2x"
								/>
							</button>
						</div>
						<h1 className="title">{anime!.title.english}</h1>
						<form onClick={handleSubmit}>
							{/* STATUS FIELD */}
							<div className="field">
								<label>Status</label>
								<select
									name="status"
									onChange={handleChange}
									value={formData.status}
									className={`${formDataError.status ? "error" : ""}`}
								>
									<option
										key={1}
										value="Watching"
									>
										Watching
									</option>
									<option
										key={2}
										value="Completed"
									>
										Completed
									</option>
									<option
										key={3}
										value="On-Hold"
									>
										On-Hold
									</option>
									<option
										key={4}
										value="Dropped"
									>
										Dropped
									</option>
									<option
										key={5}
										value="Plan to Watch"
									>
										Plan to Watch
									</option>
								</select>
								<label className="error">{formDataError.status}</label>
							</div>

							{/* EPISODES FIELD */}
							<div className="field episodes">
								<label>Episodes Watched</label>
								<div>
									<input
										type="number"
										name="episodes"
										value={formData.episodes}
										onChange={handleChange}
										className={`${formDataError.episodes ? "error" : ""}`}
									/>
									<h1>/ {anime.episodes}</h1>
								</div>
								<label className="error">{formDataError.episodes}</label>
							</div>

							{/* SCORE FIELD */}
							<div className="field">
								<label>Your Score</label>
								<select
									name="score"
									onChange={handleChange}
									value={formData.score}
									className={`${formDataError.status ? "error" : ""}`}
								>
									<option
										key={1}
										value={10}
									>
										(10) Masterpiece
									</option>
									<option
										key={2}
										value={9}
									>
										(9) Great
									</option>
									<option
										key={3}
										value={8}
									>
										(8) Very Good
									</option>
									<option
										key={4}
										value={7}
									>
										(7) Good
									</option>
									<option
										key={5}
										value={6}
									>
										(6) Fine
									</option>
									<option
										key={6}
										value={5}
									>
										(5) Average
									</option>
									<option
										key={7}
										value={4}
									>
										(4) Bad
									</option>
									<option
										key={8}
										value={3}
									>
										(3) Very Bad
									</option>
									<option
										key={9}
										value={2}
									>
										(2) Horrible
									</option>
									<option
										key={10}
										value={1}
									>
										(1) Appalling
									</option>
								</select>
								<label className="error">{formDataError.score}</label>
							</div>

							<button className="submit">
								<h3>Submit</h3>
							</button>
						</form>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default FormAnime
