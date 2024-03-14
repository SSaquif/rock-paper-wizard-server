import { Generated, Selectable, Insertable, Updateable } from "kysely";

export interface RoundTable {
  game_id: string;
  round: number;
  created_at: Generated<Date>;
  player_1_move_id: string;
  player_2_move_id: string;
  player_3_move_id: string | null;
  player_4_move_id: string | null;
  player_5_move_id: string | null;
  player_6_move_id: string | null;
  player_1_target: string;
  player_2_target: string;
  player_3_target: string | null;
  player_4_target: string | null;
  player_5_target: string | null;
  player_6_target: string | null;
  player_1_points: number;
  player_2_points: number;
  player_3_points: number | null;
  player_4_points: number | null;
  player_5_points: number | null;
  player_6_points: number | null;
}

export type Round = Selectable<RoundTable>;
export type NewRound = Insertable<RoundTable>;
