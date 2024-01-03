import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import multer from "multer"
import { storage } from "./multerConfig.js"
import { fileURLToPath } from "url"
import { compareSync } from "bcrypt"

import { register } from "./controllers/auth.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import socialRoutes from "./routes/social.js"

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
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

/* ROUTES WITH FILES */
const upload = multer({ storage: storage })
app.post("/auth/register", upload.single("picture"), register)

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/social", socialRoutes)

const PORT = process.env.PORT || 6001
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		app.listen(PORT, () => {
			process.env.NODE_ENV !== "test" ? console.log(`Server port: ${PORT}`) : ""
		})
	})
	.catch((err) => console.log(err))

export default app
