import { RequestHandler } from "express";
import { createNewGame, joinGame } from "../services/games.service.js";

export const createNewGameController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const result = await createNewGame(req);
    console.log("result from controller", result);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const joinGameController: RequestHandler = async (req, res, next) => {
  try {
    const result = await joinGame(req);
    console.log("result from controller", result);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const startGameController: RequestHandler = (req, res, next) => {};

export const leaveGameController: RequestHandler = (req, res, next) => {};

export const cancelGameController: RequestHandler = (req, res, next) => {};
