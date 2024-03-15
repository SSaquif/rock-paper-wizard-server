import { RequestHandler } from "express";
import { createNewGame } from "../services/games.service.js";

export const createNewGameController: RequestHandler = (req, res, next) => {
  try {
    const result = createNewGame(req);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const joinGameController: RequestHandler = (req, res, next) => {
  try {
    // const result = createNewGame(req);
    // return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const startGameController: RequestHandler = (req, res, next) => {};

export const leaveGameController: RequestHandler = (req, res, next) => {};

export const cancelGameController: RequestHandler = (req, res, next) => {};
