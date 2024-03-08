import { Request } from "express";
import { db } from "../adapters/db/index.js";
import { z } from "zod";
import { NewGameEntry } from "@ssaquif/rock-paper-wizard-api-types-and-schema";

export const createNewGame = (req: Request) => {
  console.log(req.body);
  const { username, numOfPlayers, password, confirmPassword }: NewGameEntry =
    req.body;
  // - validate password
  // - validate number_of_players between 2 and 6
  // - generate a new game_id
  // - add created_at timestamp
  // - add updated_at timestamp
  // - add password
  // - add player_1 name
  // - add number_of_players
  // - based on number of players, set non need player columns to null
  // - set all player gold to 0
};
