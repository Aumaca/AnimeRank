import "./profilePicture.css"

interface ProfilePictureProps {
	image: string | null
	size: number
}

const ProfilePicture = ({ image, size }: ProfilePictureProps) => {
	return (
		<>
			{image !== null ? (
				<img
					src={`${import.meta.env.VITE_API_URL}/assets/${image}`}
					width={size}
					height={size}
					alt="Profile"
				/>
			) : null}
		</>
	)
}

export default ProfilePicture
