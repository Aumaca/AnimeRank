import express from "express"
import { fetchQuery } from "../controllers/search.js"

const router = express.Router()

router.get("/", fetchQuery)

export default router
