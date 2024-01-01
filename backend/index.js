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
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import { register } from "./controllers/auth.js"

/* CONFIG */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
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

const PORT = process.env.PORT || 6001
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		app.listen(PORT, () => console.log(`Server port: ${PORT}`))
	})
	.catch((err) => console.log(err))
