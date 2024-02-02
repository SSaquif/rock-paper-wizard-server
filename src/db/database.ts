import { ColumnType } from "kysely";
import { GameTable } from "./tables/games";
import { UserTable } from "./tables/users";
export interface RockPaperWizardDatabase {
  games: GameTable;
  archived_games: Omit<GameTable, "deleted_at"> & {
    archived_at: ColumnType<Date, string | undefined, never>;
  };
  users: UserTable; // just for testing for now
}
