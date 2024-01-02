import express from "express"
import { addAnimeUserList, deleteUser } from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.delete("/deleteUser", verifyToken, deleteUser)
router.post("/addAnime", verifyToken, addAnimeUserList)

export default router
