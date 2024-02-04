import { ColumnType } from "kysely";
import { GameTable } from "./tables/games.js";
import { UserTable } from "./tables/users.js";
export interface RockPaperWizardDatabase {
  games: GameTable;
  archived_games: Omit<GameTable, "deleted_at"> & {
    archived_at: ColumnType<Date, string | undefined, never>;
  };
  users: UserTable; // just for testing for now
}
