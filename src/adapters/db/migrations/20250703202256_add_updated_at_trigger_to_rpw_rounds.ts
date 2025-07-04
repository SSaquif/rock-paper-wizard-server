import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await sql`
        CREATE TRIGGER rpw_rounds_updated_at_trigger
            BEFORE UPDATE
        ON rpw_rounds
        FOR EACH ROW
        EXECUTE FUNCTION auto_update_updated_at_column();
        `.execute(db);
}

export async function down(db: Kysely<any>) {
  await sql`
        DROP TRIGGER IF EXISTS rpw_rounds_updated_at_trigger ON rpw_rounds;
        `.execute(db);
}
