import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await sql`
        CREATE TRIGGER user_updated_at_trigger
            BEFORE UPDATE
        ON users
        FOR EACH ROW
        EXECUTE FUNCTION auto_update_updated_at_column();  
        `.execute(db);
}

export async function down(db: Kysely<any>) {
  await sql`
        DROP TRIGGER IF EXISTS user_updated_at_trigger ON users;
        `.execute(db);
}
