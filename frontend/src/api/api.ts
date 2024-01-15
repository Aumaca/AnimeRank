import axios from "axios"
import { store } from "../main" // Not a good pratice maybe but ok!!

const api = axios.create({
	baseURL: `${
		import.meta.env.MODE === "development"
			? import.meta.env.VITE_LOCAL_API_URL
			: import.meta.env.VITE_API_URL
	}`,
})

api.interceptors.request.use((config) => {
	const accessToken = store.getState().token

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

export default api
