import express, { Request, Response, NextFunction } from "express";
import { Namespace, Server } from "socket.io";
import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";
import UserRouter from "./routes/users.route.js";
import RPWGameRouter from "./routes/rpw_games.route.js";
import {
  errorLogger,
  clientErrorHandler,
  errorHandler,
} from "./middlewares/error.handler.js";
// import { dirname } from "node:path";
// import { fileURLToPath } from "node:url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

// This allows to add stuff to request object
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
// answer by basarat
declare global {
  namespace Express {
    interface Request {
      io: Server;
    }
  }
}

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
app.use("/api/rpw_games", RPWGameRouter);

// error handling middleware
app.use(errorLogger);
app.use(clientErrorHandler);
app.use(errorHandler);

const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initialize socket.io server. Attach it to express server
// TODO: Need to handle cors properly for production
const io = new Server(expressServer, {
  cors: {
    origin: "http://localhost:3000", // client URL
    // methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  },
});

// TODO: Fix type issues
// Middleware to attach io to req
app.use((req, res, next) => {
  req.io = io; // Fix TS issue
  next();
});

// Might have to do this as specified in docs
// Look into jwt for auth
// io.of((name, query, next) => {
//   // the checkToken method must return a boolean, indicating whether the client is able to connect or not.
//   next(null, checkToken(query.token));
// }).on("connection", (socket) => { /* ... */ });
type ReceivedData = {
  game_id: string;
  username: string;
};

const gameNamespace = io.of("/games").on("connect", (socket) => {
  // this was hit (nice!!)
  console.log("connected", socket.id);
  gameNamespace.on("join-game", (data: ReceivedData, ackCallback) => {
    // TODO: check in DB the id and username exists
    socket.join(data.game_id);
    console.log("joined game lobby", data.game_id);
    ackCallback({
      error: false,
      msg: `${data.username} has Joined the Lobby`,
    });
    // to all clients
    gameNamespace.to(data.game_id).emit("joined_game_lobby", {
      msg: `${data.username} has Joined the Lobby`,
    });
  });
});

// https://community.render.com/t/can-i-use-express-and-websocket-on-same-service-node/8015/2
// const wsServer = new WebSocketServer({ server: httpServer });
