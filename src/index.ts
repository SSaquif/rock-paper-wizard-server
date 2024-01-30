import { Elysia } from "elysia";

const users = new Elysia({ prefix: "/users" })
  .post("/signup", () => {})
  .post("/login", () => {})
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
