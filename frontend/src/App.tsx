import { useSelector } from "react-redux"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthState } from "./interfaces/user.ts"

import Register from "./pages/auth/register/register.tsx"
import Login from "./pages/auth/login/login.tsx"
import Search from "./pages/search/search.tsx"
import Home from "./pages/home/home.tsx"
import Profile from "./pages/profile/profile.tsx"
import AnimeList from "./pages/animeList/animeList.tsx"
import Anime from "./pages/anime/anime.tsx"
import Page404 from "./components/Page404/Page404.tsx"

import "./index.css"
import Profiles from "./pages/profiles/profiles.tsx"

function App() {
	const token = useSelector((state: AuthState) => state.token)

	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Home />}
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
						path="/search"
						element={<Search />}
					/>

					<Route
						path="/profile/:username"
						element={<Profile />}
					/>
					<Route
						path="/profiles/"
						element={<Profiles />}
					/>

					<Route
						path="/list/:username"
						element={<AnimeList />}
					/>

					<Route
						path="/anime/:animeId"
						element={<Anime />}
					/>

					<Route
						path="*"
						element={<Page404 />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
