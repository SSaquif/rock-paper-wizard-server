import { ColumnType } from "kysely";
import { GameTable } from "./tables/games";

export interface Database {
  games: GameTable;
  archived_games: Omit<GameTable, "deleted_at"> & {
    archived_at: ColumnType<Date, string | undefined, never>;
  };
}
