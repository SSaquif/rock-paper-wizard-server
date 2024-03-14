import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await sql`
    CREATE OR REPLACE FUNCTION auto_update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
    `.execute(db);
}

export async function down(db: Kysely<any>) {
  await sql`
    DROP FUNCTION IF EXISTS auto_update_updated_at_column;
    `.execute(db);
}
