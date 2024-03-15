import express, { ErrorRequestHandler, application } from "express";
import "dotenv/config";
// import { uuidv4 } from "uuid";
import Websocket, { WebSocketServer } from "ws";
import UserRouter from "./routes/users.route.js";
import GameRouter from "./routes/games.route.js";
import helmet from "helmet";
import morgan from "morgan";
import {
  errorLogger,
  clientErrorHandler,
  errorHandler,
} from "./middlewares/error.handler.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", UserRouter);
app.use("/api/games", GameRouter);

// error handling middleware
app.use(errorLogger);
app.use(clientErrorHandler);
app.use(errorHandler);

const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// https://community.render.com/t/can-i-use-express-and-websocket-on-same-service-node/8015/2
// const wsServer = new WebSocketServer({ server: httpServer });
