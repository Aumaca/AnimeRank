import { useSelector } from "react-redux"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthState } from "./interfaces/user.ts"

import Register from "./scenes/auth/registerPage/register.tsx"
import Login from "./scenes/auth/loginPage/login.tsx"
import Homepage from "./scenes/homePage/homepage.tsx"
import ProfilePage from "./scenes/profilePage/profile.tsx"
import Anime from "./scenes/animePage/anime.tsx"

import "./index.css"

function App() {
	const token = useSelector((state: AuthState) => state.token)

	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={token ? <Homepage /> : <Navigate to="/login" />}
					/>
					<Route
						path="/login"
						element={token ? <Navigate to="/" /> : <Login />}
					/>
					<Route
						path="/register"
						element={token ? <Navigate to="/" /> : <Register />}
					/>
					<Route
						path="/profile/:username"
						element={token ? <ProfilePage /> : <Navigate to="/login" />}
					/>
					<Route
						path="/anime/:animeId"
						element={token ? <Anime /> : <Navigate to="/login" />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
