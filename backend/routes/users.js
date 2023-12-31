import express from "express"
import { getUser, getUserList, addAnimeUserList } from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/:id", verifyToken, getUser)
router.get("/:id/list", verifyToken, getUserList)
router.post("/add", verifyToken, addAnimeUserList)

export default addAnimeUserList
