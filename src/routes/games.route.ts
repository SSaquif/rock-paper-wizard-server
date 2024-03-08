import express from "express";
import { createNewGameController } from "../controllers/games.controller.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Games");
});

router.post("/new-game", createNewGameController);

export default router;
