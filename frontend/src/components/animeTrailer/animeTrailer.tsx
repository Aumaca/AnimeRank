import { useEffect, useState } from "react"
import "./animeTrailer.css"

const AnimeTrailer = ({
	animeTitle,
	animeReleaseYear,
	animeTrailerId,
}: {
	animeTitle: string
	animeReleaseYear: number
	animeTrailerId: string
}) => {
	const [videoId, setVideoId] = useState(null)

	const handleSearch = async () => {
		try {
			const query = `${animeTitle} ${animeReleaseYear} anime trailer`

			const response = await fetch(
				`https://www.googleapis.com/youtube/v3/search?q=${query}&key=${
					import.meta.env.VITE_YOUTUBE_API_KEY
				}&part=snippet&type=video&maxResults=1`
			)

			if (!response.ok) {
				throw new Error("Network response was not ok")
			}

			const data = await response.json()
			const firstVideoId = data.items[0]?.id.videoId

			if (firstVideoId) {
				setVideoId(firstVideoId)
			} else {
				console.error("No videos found.")
			}
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	}

	useEffect(() => {
		handleSearch()
	}, [])

	return (
		<div className="animeTrailer">
			{animeTrailerId ? (
				<div>
					<iframe
						src={`https://www.youtube.com/embed/${animeTrailerId}`}
						title="YouTube Video"
						allowFullScreen
					></iframe>
				</div>
			) : (
				<div>
					<iframe
						src={`https://www.youtube.com/embed/${videoId}`}
						title="YouTube Video"
						allowFullScreen
					></iframe>
				</div>
			)}
		</div>
	)
}

export default AnimeTrailer