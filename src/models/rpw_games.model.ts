import {
  ColumnType,
  Generated,
  Selectable,
  Insertable,
  Updateable,
} from "kysely";
import { IntRange } from "../types/utility.types.js";

type PlayerColors = "red" | "blue" | "green" | "yellow" | "purple" | "brown";

export interface RPWGameTable {
  game_id: Generated<string>;
  created_at: Generated<Date>;
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
  player_order: string[];
  round_starter: string | null;
  unselected_colors: PlayerColors[];
  player_1_color: PlayerColors;
  player_2_color: PlayerColors | null;
  player_3_color: PlayerColors | null;
  player_4_color: PlayerColors | null;
  player_5_color: PlayerColors | null;
  player_6_color: PlayerColors | null;
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
  cards_in_play: number[];
  cards_in_deck: number[];
  discard_pile: number[];
}

export type Game = Selectable<RPWGameTable>;
export type NewGame = Insertable<RPWGameTable>;
export type UpdatedGame = Updateable<RPWGameTable>;
