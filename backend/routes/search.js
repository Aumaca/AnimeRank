import express from "express"
import { fetchQuery } from "../controllers/search.js"

const router = express.Router()

router.post("/fetchQuery", fetchQuery)

export default router
