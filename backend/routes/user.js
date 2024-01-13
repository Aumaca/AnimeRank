import express from "express"
import {
	getUser,
	getUserAndList,
	addAnimeUserList,
	setIsFavorite,
	deleteUser,
} from "../controllers/user.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/getUser/:username", verifyToken, getUser)
router.get("/getUserAndList/:username", verifyToken, getUserAndList)
router.delete("/deleteUser", verifyToken, deleteUser)
router.post("/addAnime", verifyToken, addAnimeUserList)
router.post("/setIsFavorite", verifyToken, setIsFavorite)

export default router
