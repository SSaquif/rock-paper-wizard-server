// this is just ot test the db connection for now
import {
  ColumnType,
  Generated,
  JSONColumnType,
  Selectable,
  Insertable,
  Updateable,
} from "kysely";

export interface UserTable {
  user_id: string;
  password: string;
  created_at: ColumnType<"timestamp">;
  updated_at: ColumnType<"timestamp">;
  // For later
  // email: string;
  // is_verified: boolean;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdatedUser = Updateable<UserTable>;
