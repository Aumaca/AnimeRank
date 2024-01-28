import React from "react"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { UserAnime, scoreOnlyLabels } from "../../interfaces/user"
import { AnimeType } from "../../interfaces/common"
import { getIconAnime, getStatusAnime } from "../../utils/getStatusAnime"

import "./animeListGrid.css"

type AnimeListGridProps = {
	animes: AnimeType[]
	listViewStyle: boolean
	userAnimes: UserAnime[] | null
	userProfileAnimes: UserAnime[] | null
	handleClickAdd: (anime: AnimeType) => void
	toSearch?: boolean
}

const AnimeListGrid: React.FC<AnimeListGridProps> = ({
	listViewStyle,
	userAnimes,
	userProfileAnimes,
	animes,
	handleClickAdd,
	toSearch,
}) => {
	if (!toSearch && userProfileAnimes) {
		return (
			<>
				<div className={`anime-list-grid ${listViewStyle ? "list" : "grid"}`}>
					{animes.map((anime) => (
						<div
							className="with-cursor"
							key={anime.id}
						>
							{listViewStyle ? (
								<>
									<Link to={`/anime/${anime.id}`}>
										<div className="anime_item">
											<img
												src={anime.coverImage.large}
												alt=""
												className={`${getStatusAnime(
													userProfileAnimes,
													anime,
													true
												)}`}
											/>
											<div className="content with-margin">
												<h2>
													{anime.title.english
														? anime.title.english
														: anime.title.romaji}
												</h2>

												{userProfileAnimes.length && (
													<div className="status">
														<h3
															className={`${getStatusAnime(
																userProfileAnimes,
																anime,
																true
															)}`}
														>
															{getStatusAnime(userProfileAnimes, anime, false)}
														</h3>
													</div>
												)}

												{userProfileAnimes.length && (
													<div className="notes">
														<h3>
															{userProfileAnimes.filter(
																(userAnime) => userAnime.id === anime.id
															)[0].notes &&
																`"${
																	userProfileAnimes.filter(
																		(userAnime) => userAnime.id === anime.id
																	)[0].notes
																}"`}
														</h3>
													</div>
												)}

												<div className="information">
													<p>
														Watched:&nbsp;
														{
															userProfileAnimes.filter(
																(userAnime) => userAnime.id === anime.id
															)[0].episodes
														}
													</p>

													<div className="score">
														<h3>
															{
																userProfileAnimes.filter(
																	(userAnime) => userAnime.id === anime.id
																)[0].score
															}
														</h3>
														<FontAwesomeIcon
															icon={faStar}
															size="xl"
														/>
														<h3>
															{
																scoreOnlyLabels[
																	userProfileAnimes.filter(
																		(userAnime) => userAnime.id === anime.id
																	)[0].score - 1
																]
															}
														</h3>
													</div>
												</div>
											</div>
										</div>
									</Link>
								</>
							) : (
								<>
									<Link to={`/anime/${anime.id}`}>
										<div className="anime_item">
											<img
												src={anime.coverImage.large}
												alt=""
												className={`${getStatusAnime(
													userProfileAnimes,
													anime,
													true
												)}`}
											/>
											<div className="content with-margin">
												<h2>
													{anime.title.english
														? anime.title.english
														: anime.title.romaji}
												</h2>
												<div className="information">
													<p>
														Watched:&nbsp;
														{
															userProfileAnimes.filter(
																(userAnime) => userAnime.id === anime.id
															)[0].episodes
														}
													</p>
													<div className="score">
														<h3>
															{
																userProfileAnimes.filter(
																	(userAnime) => userAnime.id === anime.id
																)[0].score
															}
														</h3>
														<FontAwesomeIcon
															icon={faStar}
															size="xl"
														/>
													</div>
												</div>
											</div>
										</div>
									</Link>
								</>
							)}
						</div>
					))}
				</div>
			</>
		)
	} else if (!toSearch && userAnimes) {
		return (
			<>
				<div className={`anime-list-grid ${listViewStyle ? "list" : "grid"}`}>
					{animes.map((anime) => (
						<div
							className="with-cursor"
							key={anime.id}
						>
							{listViewStyle ? (
								<>
									<Link to={`/anime/${anime.id}`}>
										<div className="anime_item">
											<img
												src={anime.coverImage.large}
												alt=""
												className={`${getStatusAnime(
													userAnimes,
													anime,
													true
												)}`}
											/>
											<div className="content with-margin">
												<h2>
													{anime.title.english
														? anime.title.english
														: anime.title.romaji}
												</h2>

												{userAnimes.length && (
													<div className="status">
														<h3
															className={`${getStatusAnime(
																userAnimes,
																anime,
																true
															)}`}
														>
															{getStatusAnime(userAnimes, anime, false)}
														</h3>
													</div>
												)}

												{userAnimes.length && (
													<div className="notes">
														<h3>
															{userAnimes.filter(
																(userAnime) => userAnime.id === anime.id
															)[0].notes &&
																`"${
																	userAnimes.filter(
																		(userAnime) => userAnime.id === anime.id
																	)[0].notes
																}"`}
														</h3>
													</div>
												)}

												<div className="information">
													<p>
														Watched:&nbsp;
														{
															userAnimes.filter(
																(userAnime) => userAnime.id === anime.id
															)[0].episodes
														}
													</p>

													<div className="score">
														<h3>
															{
																userAnimes.filter(
																	(userAnime) => userAnime.id === anime.id
																)[0].score
															}
														</h3>
														<FontAwesomeIcon
															icon={faStar}
															size="xl"
														/>
														<h3>
															{
																scoreOnlyLabels[
																	userAnimes.filter(
																		(userAnime) => userAnime.id === anime.id
																	)[0].score - 1
																]
															}
														</h3>
													</div>
												</div>
											</div>
										</div>
									</Link>
								</>
							) : (
								<>
									<Link to={`/anime/${anime.id}`}>
										<div className="anime_item">
											<img
												src={anime.coverImage.large}
												alt=""
												className={`${getStatusAnime(
													userAnimes,
													anime,
													true
												)}`}
											/>
											<div className="content with-margin">
												<h2>
													{anime.title.english
														? anime.title.english
														: anime.title.romaji}
												</h2>
												<div className="information">
													<p>
														Watched:&nbsp;
														{
															userAnimes.filter(
																(userAnime) => userAnime.id === anime.id
															)[0].episodes
														}
													</p>
													<div className="score">
														<h3>
															{
																userAnimes.filter(
																	(userAnime) => userAnime.id === anime.id
																)[0].score
															}
														</h3>
														<FontAwesomeIcon
															icon={faStar}
															size="xl"
														/>
													</div>
												</div>
											</div>
										</div>
									</Link>
								</>
							)}
						</div>
					))}
				</div>
			</>
		)
	} else {
		return (
			<>
				<div className={`anime-list-grid ${listViewStyle ? "list" : "grid"}`}>
					{animes.map((anime) => (
						<div
							className="result"
							key={anime.id}
						>
							<div
								className={`form-button ${getStatusAnime(
									userAnimes,
									anime,
									true
								)}`}
							>
								<FontAwesomeIcon
									icon={getIconAnime(getStatusAnime(userAnimes, anime, true))}
									size="2x"
									onClick={() => handleClickAdd(anime)}
								/>
							</div>
							<Link to={`/anime/${anime.id}`}>
								<div className="anime_item">
									<img
										src={anime.coverImage.large}
										alt=""
										className={`${getStatusAnime(userAnimes, anime, true)}`}
									/>
									<div
										className={`content ${
											getStatusAnime(userAnimes, anime, true, true) &&
											"with-margin"
										}`}
									>
										<h2>
											{anime.title.english
												? anime.title.english
												: anime.title.romaji}
										</h2>

										<div className="status"></div>

										<div className="information">
											<p>Episodes: {anime.episodes}</p>

											<div className="score">
												<h3>Score: {anime.averageScore}</h3>
												<FontAwesomeIcon
													icon={faStar}
													size="xl"
												/>
											</div>
										</div>
									</div>
								</div>
							</Link>
						</div>
					))}
				</div>
			</>
		)
	}
}

export default AnimeListGrid
