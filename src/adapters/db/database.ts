import { ColumnType } from "kysely";
import { RPWGameTable } from "../../models/rpw_games.model.js";
import { UserTable } from "../../models/users.model.js";
import { RoundTable } from "../../models/rpw_rounds.model.js";
import { SessionTable } from "../../models/sessions.model.js";
export interface BoardGamesDatabase {
  users: UserTable;
  rpw_games: RPWGameTable;
  sessions: SessionTable;
  rpw_rounds: RoundTable;
  // unused at the moment
  rpw_archived_games: Omit<RPWGameTable, "deleted_at"> & {
    archived_at: ColumnType<Date, string | undefined, never>;
  };
}
