import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await sql`
    CREATE TRIGGER rpw_game_updated_at_trigger
        BEFORE UPDATE
    ON rpw_games
    FOR EACH ROW
    EXECUTE FUNCTION auto_update_updated_at_column();  
    `.execute(db);
}

export async function down(db: Kysely<any>) {
  await sql`
    DROP TRIGGER IF EXISTS rpw_game_updated_at_trigger ON rpw_games;
    `.execute(db);
}
