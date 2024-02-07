import express from "express";
import "dotenv/config";
import { db } from "./adapters/db/index.js";
import { User } from "./adapters/db/tables/users.js";
const PORT = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// for testing the database connection
app.get("/api/users", async (req, res) => {
  const users = await db.selectFrom("users").selectAll().execute();
  console.log(users[0]);
  return res.json({ users });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
