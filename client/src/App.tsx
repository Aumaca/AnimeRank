import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./scenes/auth/registerPage/register.tsx"
import Login from "./scenes/auth/loginPage/login.tsx"
import Homepage from "./scenes/homePage/homepage.tsx"
import ProfilePage from "./scenes/profilePage/profilePage.tsx"
import { useSelector } from "react-redux"
import { AuthState } from "./state/index.ts"
import { Navigate } from "react-router-dom"
import "./index.css"

function App() {
  const isAuth = Boolean(useSelector((state: AuthState) => state.token))

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuth ? <Homepage /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isAuth ? <Navigate to="/" /> : <Register />} />
          <Route path="/profile/:id" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
