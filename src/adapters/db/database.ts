import { ColumnType } from "kysely";
import { RPWGameTable } from "../../models/rpw_games.model.js";
import { UserTable } from "../../models/users.model.js";
import { RoundTable } from "../../models/rpw_rounds.model.js";
export interface BoardGamesDatabase {
  rpw_games: RPWGameTable;
  rpw_rounds: RoundTable;
  rpw_archived_games: Omit<RPWGameTable, "deleted_at"> & {
    archived_at: ColumnType<Date, string | undefined, never>;
  };
  users: UserTable; // just for testing for now
}
