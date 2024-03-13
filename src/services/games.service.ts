import { Request } from "express";
import { db } from "../adapters/db/index.js";
import { NewGameEntrySchema } from "@ssaquif/rock-paper-wizard-api-types-and-schema";
import { NewGame } from "../models/games.model.js";

export const createNewGame = async (req: Request) => {
  const validatedFormInput = NewGameEntrySchema.safeParse(req.body);
  if (!validatedFormInput.success) {
    throw new Error(validatedFormInput.error.issues[0].message);
  }

  // const { username, numOfPlayers, password, confirmPassword } =
  //   validatedFormInput.data;

  const dataToInsert = {
    username: validatedFormInput.data.username,
    numOfPlayers: validatedFormInput.data.numOfPlayers,
    password: validatedFormInput.data.password,
  };

  // - generate a new game_id
  // - add created_at timestamp
  // - add updated_at timestamp
  // - add password
  // - add player_1 name
  // - add number_of_players
  // - based on number of players, set non need player columns to null
  // - set all player gold to 0
  // const result = await db
  //   .insertInto("games")
  //   .values(dataToInsert)
  //   .executeTakeFirst();
};
