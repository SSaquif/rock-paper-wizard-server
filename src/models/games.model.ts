import {
  ColumnType,
  Generated,
  Selectable,
  Insertable,
  Updateable,
} from "kysely";
import { IntRange } from "../types/utility.types.js";

export interface GameTable {
  game_id: Generated<string>;
  created_at: Generated<Date>;
  // todo: create a trigger and then uncomment
  updated_at: Generated<Date>;
  password: string;
  game_status: "creating" | "ongoing" | "completed";
  number_of_players: 2 | 3 | 4 | 5 | 6;
  current_round: number;
  player_1: string;
  player_2: string | null;
  player_3: string | null;
  player_4: string | null;
  player_5: string | null;
  player_6: string | null;
  round_starter:
    | GameTable["player_1"]
    | GameTable["player_2"]
    | GameTable["player_3"]
    | GameTable["player_4"]
    | GameTable["player_5"]
    | GameTable["player_6"];
  // todo: see if it would be better to use an array for the points
  player_1_points: number;
  player_2_points: number | null;
  player_3_points: number | null;
  player_4_points: number | null;
  player_5_points: number | null;
  player_6_points: number | null;
  player_1_position: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  player_2_position: number | null;
  player_3_position: number | null;
  player_4_position: number | null;
  player_5_position: number | null;
  player_6_position: number | null;
}

export type Game = Selectable<GameTable>;
export type NewGame = Insertable<GameTable>;
export type UpdatedGame = Updateable<GameTable>;
