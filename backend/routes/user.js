import express from "express"
import {
	getUser,
	getUserAndList,
	deleteUser,
	addUpdateAnimeUserList,
	setIsFavorite,
	deleteAnimeUserList,
} from "../controllers/user.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/getUser/:username", verifyToken, getUser)
router.get("/getUserAndList/:username", verifyToken, getUserAndList)
router.delete("/deleteUser", verifyToken, deleteUser)

router.put("/addUpdateAnime", verifyToken, addUpdateAnimeUserList)
router.post("/deleteAnime", verifyToken, deleteAnimeUserList)
router.post("/setIsFavorite", verifyToken, setIsFavorite)

export default router
