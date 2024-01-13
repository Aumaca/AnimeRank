import express from "express"
import {
	getUser,
	getUserAndList,
	addUpdateAnimeUserList,
	setIsFavorite,
	deleteUser,
} from "../controllers/user.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/getUser/:username", verifyToken, getUser)
router.get("/getUserAndList/:username", verifyToken, getUserAndList)
router.delete("/deleteUser", verifyToken, deleteUser)

router.put("/addUpdateAnime", verifyToken, addUpdateAnimeUserList)
router.post("/setIsFavorite", verifyToken, setIsFavorite)

export default router
