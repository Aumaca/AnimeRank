import express from "express"
import {
    getUser,
    getUserList,
    addAnimeList,
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/:id", verifyToken, getUser)
router.get("/:id/list", verifyToken, getUserList)
router.patch("/:id/:animeId", verifyToken, addAnimeList)

export default router