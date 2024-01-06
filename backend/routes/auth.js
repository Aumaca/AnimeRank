import express from "express"
import multer from "multer"
import { storage } from "../multerConfig.js"
import { register, login } from "../controllers/auth.js"

const upload = multer({ storage: storage })
const router = express.Router()

router.post("/register", upload.single("picture"), register)
router.post("/login", login)

export default router
