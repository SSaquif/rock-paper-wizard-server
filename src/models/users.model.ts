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
  is_admin: boolean;
  // @todo: figure out how to make them timestamp with timezone
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  // For later
  // email: string;
  // is_verified: boolean;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdatedUser = Updateable<UserTable>;
