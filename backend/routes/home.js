import express from "express"
import { animes } from "../controllers/home.js"

const router = express.Router()

router.get("/animes", animes)

export default router
