import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await sql`
        CREATE TRIGGER session_updated_at_trigger
            BEFORE UPDATE
        ON sessions
        FOR EACH ROW
        EXECUTE FUNCTION auto_update_updated_at_column();
        `.execute(db);
}

export async function down(db: Kysely<any>) {
  await sql`
        DROP TRIGGER IF EXISTS session_updated_at_trigger ON sessions;
        `.execute(db);
}
