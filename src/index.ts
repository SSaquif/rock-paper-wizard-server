import { Elysia } from "elysia";
import { db } from "./db";
import "dotenv/config";

const users = new Elysia({ prefix: "/users" })
  .post("/signup", () => {})
  .post("/login", () => {})
  .get("/all", async () => {
    const users = await db.selectFrom("users").selectAll().execute();
    return users;
  })
  .get("/logout", () => {
    return "logout";
  });

const app = new Elysia()
  .use(users)
  .get("/", () => "Hello Elysia")
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// console.log(process.env);
