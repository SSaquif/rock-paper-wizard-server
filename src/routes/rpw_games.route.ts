import express from "express";
import {
  createNewGame,
  joinGame,
  getGameByID,
} from "../controllers/rpw_games.controller.js";
const router = express.Router();
// TODO: Add generics for http methods
router.get("/", (req, res) => {
  res.send("Hello Games");
});

router.post("/new-game", createNewGame);

router.patch("/join-game", joinGame);

router.get("/game/:gameId", getGameByID);

export default router;
