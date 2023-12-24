import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./scenes/auth/registerPage/register.tsx"
import Login from "./scenes/auth/loginPage/login.tsx"
import Homepage from "./scenes/homePage/homepage.tsx"
import ProfilePage from "./scenes/profilePage/profilePage.tsx"
import "./index.css"

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
