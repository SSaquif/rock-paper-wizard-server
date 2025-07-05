import express from "express";
import {
  getUsers,
  registerUser,
  loginUser,
} from "../controllers/users.controller.js";
import { getUserSessionFromCookie } from "../controllers/users.controller.js";
const router = express.Router();

// /api/users
// for testing the database connection
router.get("/", getUsers);

// /api/users/register
router.post("/register", registerUser);

// /api/users/login
router.post("/login", loginUser);

// /api/users/session
router.get("/session", getUserSessionFromCookie);

export default router;
