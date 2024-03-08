import express, { application } from "express";
import "dotenv/config";
import { db } from "./adapters/db/index.js";
import { User } from "./models/users.model.js";
// import { uuidv4 } from "uuid";
import Websocket, { WebSocketServer } from "ws";
import UserRouter from "./routes/users.route.js";
import GameRouter from "./routes/games.route.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", UserRouter);
app.use("/api/games", GameRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// https://community.render.com/t/can-i-use-express-and-websocket-on-same-service-node/8015/2
// const wsServer = new WebSocketServer({ server: httpServer });
