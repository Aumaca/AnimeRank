import express from "express"
import { getUser, addAnimeUserList, deleteUser } from "../controllers/user.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/:username/:status?", verifyToken, getUser)
router.delete("/deleteUser", verifyToken, deleteUser)
router.post("/addAnime", verifyToken, addAnimeUserList)

export default router
