import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Register
// http://localhost:3002/register
router.post("/register", register);

// Login
//localhost:3002/login
router.post("/login", login);

// Get Me
// http://localhost:3002/me
router.get("/me", checkAuth, getMe);

export default router;
