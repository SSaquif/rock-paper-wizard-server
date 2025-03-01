import express from "express";
import {
  getUsers,
  registerUser,
  loginUser,
} from "../controllers/users.controller.js";
const router = express.Router();

// /api/users
// for testing the database connection
router.get("/", getUsers);

// /api/users/register
// register a new user
router.post("/register", registerUser);

// /api/users/login
// sign in a user
// @todo: decide if I want to use a something other than POST
router.post("/login", loginUser);

export default router;
