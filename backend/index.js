import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"

/* CONFIG */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()

if (process.env.NODE_ENV !== "test") {
	app.use(morgan("common"))
}

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors({ origin: "https://aumaca-animerank.vercel.app" }))
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/user", userRoutes)

const PORT = process.env.PORT || 3001
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		app.listen(PORT, () => {
			process.env.NODE_ENV !== "test" ? console.log(`Server port: ${PORT}`) : ""
		})
	})
	.catch((err) => console.log("Error while connecting to mongoDB server."))

export default app
