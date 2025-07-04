import { Generated, Selectable, Insertable, Updateable } from "kysely";

export interface SessionTable {
  session_id: Generated<string>;
  user_id: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  expires_at: Date;
}

export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type UpdatedSession = Updateable<SessionTable>;
