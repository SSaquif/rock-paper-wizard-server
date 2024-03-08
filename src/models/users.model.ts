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
  email: string;
  password: string;
}

export type User = Selectable<UserTable>;
