import express from "express";
import { db } from "../adapters/db/index.js";
import bycrypt from "bcrypt";
const router = express.Router();

// todo break down into individual routers
// for testing the database connection
router.get("/", async (req, res) => {
  const users = await db.selectFrom("users").selectAll().execute();
  console.log(users[0]);
  return res.json({ users });
});

// register a new user
router.post("/register", async (req, res) => {
  const { user_id, password, confirm_password } = req.body;
  // Todo: Double check the validation that is done via zod
  // check if password and confirm password match
  // I thinks this is already handled by Zod
  if (password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Check if user already exists
  const existingUser = await db
    .selectFrom("users")
    .selectAll()
    .where("user_id", "=", user_id)
    .execute();

  // TODO: Add to error codes
  if (existingUser.length) {
    return res.status(400).json({ error: "User already exists" });
  }

  // encrypt the password
  const hashedPassword = await bycrypt.hash(password, 10);

  const user = await db
    .insertInto("users")
    .values({
      user_id,
      password: hashedPassword,
    })
    .returning(["user_id"])
    .execute();

  return res.json({ user });
});

// sign in a user
// decide if I want to use a something other than POST
router.post("/login", async (req, res) => {
  const { user_id, password } = req.body;
  const user = await db
    .selectFrom("users")
    .where("user_id", "=", user_id)
    .selectAll()
    .executeTakeFirst();

  // check if user exists
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const match = await bycrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.json({ user });
});

export default router;
