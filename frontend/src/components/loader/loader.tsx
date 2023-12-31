import "./loader.css"

const Loader = ({ isActive }: { isActive: boolean }) => {
	return (
		<div className={`spinner-container ${isActive ? "active" : ""}`}>
			<div className="lds-grid">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Loader
