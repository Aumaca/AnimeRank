import express from "express"
import { getUser } from "../controllers/social.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/:userId/:status?", verifyToken, getUser)
export default router
