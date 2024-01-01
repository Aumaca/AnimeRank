import express from "express"
import { addAnimeUserList } from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.post("/addAnime", verifyToken, addAnimeUserList)

export default router
