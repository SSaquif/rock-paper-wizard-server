import {
  ColumnType,
  Generated,
  JSONColumnType,
  Selectable,
  Insertable,
  Updateable,
} from "kysely";

export interface GameTable {
  game_id: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, string | undefined>;
  deleted_at: ColumnType<Date, string | undefined, string | undefined>;
  password: string;
  number_of_players: number; // 2 to 6
  // todo: see if it would be better to use an array for the players
  currentRound: number;
  player1: string;
  player2: string;
  player3: string | null;
  player4: string | null;
  player5: string | null;
  player6: string | null;
  round_starter:
    | GameTable["player1"]
    | GameTable["player2"]
    | GameTable["player3"]
    | GameTable["player4"]
    | GameTable["player5"]
    | GameTable["player6"];
  // todo: see if it would be better to use an array for the points
  player1_points: number;
  player2_points: number;
  player3_points: number | null;
  player4_points: number | null;
  player5_points: number | null;
  player6_points: number | null;
  game_status: "creating" | "ongoing" | "completed";
  // todo: see if can use TS to determine the round number based on the length of the array of rounds
  // otherwise might be redundant, should probably just have it in the archived table
  // rounds: JSONColumnType<Round[]>;
}

export type Game = Selectable<GameTable>;
export type NewGame = Insertable<GameTable>;
export type UpdatedGame = Updateable<GameTable>;
