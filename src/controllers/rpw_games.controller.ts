import { RequestHandler } from "express";
import {
  createNewGameService,
  getGameByGameIDService,
  joinGameService,
} from "../services/rpw_games.service.js";

export const createNewGame: RequestHandler = async (req, res, next) => {
  try {
    const result = await createNewGameService(req);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const joinGame: RequestHandler = async (req, res, next) => {
  try {
    const result = await joinGameService(req);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const startGame: RequestHandler = async (req, res, next) => {};

export const leaveGame: RequestHandler = async (req, res, next) => {};

export const cancelGame: RequestHandler = async (req, res, next) => {};

export const getGameByID: RequestHandler = async (req, res, next) => {
  try {
    const result = await getGameByGameIDService(req);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};
