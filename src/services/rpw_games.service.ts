import { Request } from "express";
import { db } from "../adapters/db/index.js";
import {
  NewGameFormSchema,
  JoinGameFormSchema,
  SYSTEM_ERRORS,
  APIErrorResponse,
  PLAYER_COLORS,
} from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { Game, NewGame } from "../models/rpw_games.model.js";
import { IntRange } from "../types/utility.types.js";
import { Socket } from "socket.io";

export const createNewGameService = async (
  req: Request
): Promise<Game | APIErrorResponse> => {
  const validatedFormInput = NewGameFormSchema.safeParse(req.body);
  if (!validatedFormInput.success) {
    throw new Error(validatedFormInput.error.issues[0].message);
  }

  const remainingColors = PLAYER_COLORS.filter(
    (color) => color !== validatedFormInput.data.selectedColor
  );

  const dataToInsert: NewGame = {
    player_1: validatedFormInput.data.username,
    player_1_points: 0,
    player_1_position: 6,
    number_of_players: validatedFormInput.data.numOfPlayers as IntRange<2, 6>,
    password: validatedFormInput.data.password,
    player_1_color: validatedFormInput.data.selectedColor,
    current_round: 0,
    player_order: [],
    game_status: "creating",
    cards_in_play: [],
    cards_in_deck: [],
    discard_pile: [],
    unselected_colors: remainingColors,
  };

  // todo: determine if I need to return all
  const result = await db
    .insertInto("rpw_games")
    .values(dataToInsert)
    .returningAll()
    .executeTakeFirstOrThrow();

  console.log("result from service", result);
  return result;
};

export const joinGameService = async (
  req: Request
): Promise<Game | APIErrorResponse> => {
  const validatedFormInput = JoinGameFormSchema.safeParse(req.body);
  if (!validatedFormInput.success) {
    throw new Error(validatedFormInput.error.issues[0].message);
  }
  const { gameId, username, password, selectedColor } = validatedFormInput.data;

  const game = await db
    .selectFrom("rpw_games")
    .selectAll()
    .where("game_id", "=", gameId)
    .executeTakeFirst();

  if (!game) {
    return { error: SYSTEM_ERRORS.GAME_NOT_FOUND }; // todo: consider throwing error instead
  }
  if (gameId !== game.game_id) {
    return { error: SYSTEM_ERRORS.GAME_NOT_FOUND }; // todo: consider throwing error instead
  }
  if (password !== game.password) {
    return { error: SYSTEM_ERRORS.INVALID_PASSWORD }; // todo: consider throwing error instead
  }

  const {
    player_1,
    player_2,
    player_3,
    player_4,
    player_5,
    player_6,
    number_of_players,
    unselected_colors,
  } = game;

  /**
   * TODO: To Consider:
   * Might be ok to not throw them and return repsonse like now
   * Esp if I plan to log errors in a discord channel
   * Wouln't want to log input errors and
   */
  if (!unselected_colors.includes(selectedColor)) {
    return { error: SYSTEM_ERRORS.INVALID_COLOR }; // todo: consider throwing error instead
  }

  const remainingColors = unselected_colors.filter(
    (color) => color !== selectedColor
  );

  const players = [player_1, player_2, player_3, player_4, player_5, player_6];

  // check if game is full
  const spotsTaken = players.filter((player) => player).length;
  if (spotsTaken >= number_of_players) {
    return { error: SYSTEM_ERRORS.GAME_FULL }; // todo: consider throwing error instead
  }

  // check for duplicate username
  if (players.includes(username)) {
    return { error: SYSTEM_ERRORS.DUPLICATE_USERNAME }; // todo: consider throwing error instead
  }

  const updatedGame = {
    ...game,
    [`player_${spotsTaken + 1}`]: username,
    [`player_${spotsTaken + 1}_points`]: 0,
    [`player_${spotsTaken + 1}_position`]: 6,
    [`player_${spotsTaken + 1}_color`]: selectedColor,
    unselected_colors: remainingColors,
  };

  const result = await db
    .updateTable("rpw_games")
    .set(updatedGame)
    .where("game_id", "=", gameId)
    .returningAll()
    .executeTakeFirstOrThrow();

  // join room for the game
  // const socket = req.app.get("socket") as Socket;
  // socket.join(gameId);
  return result;
};

export const getGameByGameIDService = async (
  req: Request
): Promise<Game | APIErrorResponse> => {
  const result = await db
    .selectFrom("rpw_games")
    .selectAll()
    .where("game_id", "=", req.params.gameId)
    .executeTakeFirst();

  if (!result) {
    return { error: SYSTEM_ERRORS.GAME_NOT_FOUND };
  }
  return result;
};
