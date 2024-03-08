import express from "express";
import { db } from "../adapters/db/index.js";
const router = express.Router();

//todo break down into individual routers
// for testing the database connection
router.get("/", async (req, res) => {
  const users = await db.selectFrom("users").selectAll().execute();
  console.log(users[0]);
  return res.json({ users });
});

export default router;
