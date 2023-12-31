import { ProfilePictureProps } from "../../interfaces/common"
import "./profilePicture.css"

const ProfilePicture = ({
	image,
	size,
	classname = "",
}: ProfilePictureProps) => {
	return (
		<>
			{image !== null ? (
				<img
					className={classname}
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
