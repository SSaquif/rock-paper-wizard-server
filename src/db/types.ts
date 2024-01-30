import {
  ColumnType,
  Generated,
  JSONColumnType,
  Selectable,
  Insertable,
  Updateable,
} from "kysely";

export interface Database {
  games: GameTable;
  archived_games: Omit<GameTable, "deleted_at"> & {
    archived_at: ColumnType<Date, string | undefined, never>;
  };
}

export interface GameTable {
  id: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, string | undefined>;
  deleted_at: ColumnType<Date, string | undefined, string | undefined>;
  password: string;
  number_of_players: number; // 2 to 6
  // todo: use ts to let array size between 2 and 6, and items have to be unique
  players: string[];
  player1_points: number;
  player2_points: number;
  player3_points: number | null;
  player4_points: number | null;
  player5_points: number | null;
  player6_points: number | null;
  rounds: JSONColumnType<Round[]>;
}

// todo: Use TS for key names maybe, depending on how many keys there are
interface Round {
  round: number;
  player1_move: string;
  player2_move: string;
  player3_move: string | null;
  player4_move: string | null;
  player5_move: string | null;
  player6_move: string | null;
  player1_target: string;
  player2_target: string;
  player3_target: string | null;
  player4_target: string | null;
  player5_target: string | null;
  player6_target: string | null;
  player1_position: number;
  player2_position: number;
  player3_position: number | null;
  player4_position: number | null;
  player5_position: number | null;
  player6_position: number | null;
  player1_points: number;
  player2_points: number;
  player3_points: number | null;
  player4_points: number | null;
  player5_points: number | null;
  player6_points: number | null;
}
