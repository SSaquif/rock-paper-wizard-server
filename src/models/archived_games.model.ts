import { ColumnType, JSONColumnType, Selectable, Insertable } from "kysely";
import { GameTable } from "./games.model.js";
import { Round } from "./rounds.js";

// todo: Use a trigger to archive games when games_end or every player has exited game lobby
export interface ArchivedGameTable extends GameTable {
  // todo: see if can use TS to determine the round number based on the length of the array of rounds
  // otherwise might be redundant, should probably just have it in the archived table
  rounds: JSONColumnType<Round[]>;
  archived_at: ColumnType<Date, string | undefined, string | undefined>;
}

export type ArchivedGame = Selectable<ArchivedGameTable>;
export type NewArchivedGame = Insertable<ArchivedGameTable>;
