import { Request } from "express";
import { db } from "../adapters/db/index.js";
import {
  NewGameEntrySchema,
  XHR_ERRORS,
  APIErrorResponse,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { Game, NewGame } from "../models/games.model.js";
import { IntRange } from "../types/utility.types.js";

export const createNewGame = async (
  req: Request
): Promise<Game | APIErrorResponse> => {
  const validatedFormInput = NewGameEntrySchema.safeParse(req.body);
  if (!validatedFormInput.success) {
    throw new Error(validatedFormInput.error.issues[0].message);
  }

  const dataToInsert: NewGame = {
    player_1: validatedFormInput.data.username,
    player_1_points: 0,
    player_1_position: 6,
    number_of_players: validatedFormInput.data.numOfPlayers as IntRange<2, 6>,
    password: validatedFormInput.data.password,
    current_round: 0,
    game_status: "creating",
  };

  // todo: determine if I need to return all
  const result = await db
    .insertInto("games")
    .values(dataToInsert)
    .returningAll()
    .executeTakeFirstOrThrow();

  return result;
};

export const joinGame = async (
  req: Request
): Promise<Game | APIErrorResponse> => {
  const { game_id, username, password } = req.body;
  const game = await db
    .selectFrom("games")
    .selectAll()
    .where("game_id", "=", game_id)
    .executeTakeFirst();

  if (!game) {
    return { error: XHR_ERRORS.GAME_NOT_FOUND };
  }
  if (game.password !== password) {
    return { error: XHR_ERRORS.INVALID_PASSWORD };
  }

  const updatedGame = {
    ...game,
    [`player_${game.number_of_players}`]: username,
  };

  const result = await db
    .updateTable("games")
    .set(updatedGame)
    .where("game_id", "=", game_id)
    .returningAll()
    .executeTakeFirstOrThrow();

  return result;
};
