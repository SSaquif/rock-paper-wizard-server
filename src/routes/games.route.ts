import express from "express";
import {
  createNewGameController,
  joinGameController,
} from "../controllers/games.controller.js";
const router = express.Router();
// TODO: Add generics for http methods
router.get("/", (req, res) => {
  res.send("Hello Games");
});

router.post("/new-game", createNewGameController);

router.patch("/join-game", joinGameController);

export default router;
