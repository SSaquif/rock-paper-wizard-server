import express from "express";
import { Server } from "socket.io";
import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";
import UserRouter from "./routes/users.route.js";
import GameRouter from "./routes/games.route.js";
import {
  errorLogger,
  clientErrorHandler,
  errorHandler,
} from "./middlewares/error.handler.js";
// import { dirname } from "node:path";
// import { fileURLToPath } from "node:url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
// console.log(__dirname);
// app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", UserRouter);
app.use("/api/games", GameRouter);

// error handling middleware
app.use(errorLogger);
app.use(clientErrorHandler);
app.use(errorHandler);

const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// TODO: Need to handle cors properly for production
const io = new Server(expressServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Here I beleive I am using the game namespace
io.of("/game").on("connection", (socket) => {
  // This will allow access to the socket object in the route handlers
  // Then I will have to do `const socket = req.app.get("socket")` in the route handlers
  // Figure out a way to type this
  console.log("a user connected", socket.id);
  app.set("socket", socket);
  // socket.on("
});

// https://community.render.com/t/can-i-use-express-and-websocket-on-same-service-node/8015/2
// const wsServer = new WebSocketServer({ server: httpServer });
