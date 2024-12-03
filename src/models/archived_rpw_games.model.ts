import { Generated, JSONColumnType, Selectable, Insertable } from "kysely";
import { RPWGameTable } from "./rpw_games.model.js";
import { Round } from "./rpw_rounds.model.js";

// todo: Use a trigger to archive games when games_end or every player has exited game lobby
export interface ArchivedRPWGameTable extends RPWGameTable {
  // todo: see if can use TS to determine the round number based on the length of the array of rounds
  // otherwise might be redundant, should probably just have it in the archived table
  rounds: JSONColumnType<Round[]>;
  archived_at: Generated<Date>;
}

export type ArchivedGame = Selectable<ArchivedRPWGameTable>;
export type NewArchivedGame = Insertable<ArchivedRPWGameTable>;
