import express from "express";
import {
  createNewGameController,
  joinGameController,
} from "../controllers/games.controller.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Games");
});

router.post("/new-game", createNewGameController);

router.patch("/join-game", joinGameController);

export default router;
