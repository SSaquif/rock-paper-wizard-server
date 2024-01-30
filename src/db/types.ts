import {
  ColumnType,
  Generated,
  JSONColumnType,
  Selectable,
  Insertable,
  Updateable,
} from "kysely";

export interface Game {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  password: string;
  number_of_players: number; // 2 to 6
  players: JSONColumnType<{
    player1: string;
    player2: string;
    player3: string | null;
    player4: string | null;
    player5: string | null;
    player6: string | null;
  }>;
}
