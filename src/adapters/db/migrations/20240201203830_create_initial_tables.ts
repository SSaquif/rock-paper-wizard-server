import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db);
  await db.schema
    .createTable("games")
    .addColumn("game_id", "uuid", (col) =>
      col.defaultTo(sql`uuid_generate_v4()`).notNull()
    ) //todo: use procedure to generate game_id and make it varchar
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("deleted_at", "timestamp")
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("number_of_players", "integer", (col) => col.notNull())
    .addColumn("current_round", "integer", (col) => col.notNull())
    .addColumn("player1", "varchar", (col) => col.notNull())
    .addColumn("player2", "varchar", (col) => col.notNull())
    .addColumn("player3", "varchar")
    .addColumn("player4", "varchar")
    .addColumn("player5", "varchar")
    .addColumn("player6", "varchar")
    .addColumn("round_starter", "varchar")
    .addColumn("player1_points", "integer", (col) => col.notNull())
    .addColumn("player2_points", "integer", (col) => col.notNull())
    .addColumn("player3_points", "integer")
    .addColumn("player4_points", "integer")
    .addColumn("player5_points", "integer")
    .addColumn("player6_points", "integer")
    .addColumn("game_status", "varchar", (col) => col.notNull()) // creating, ongoing, completed
    .addPrimaryKeyConstraint("primary_key_games_table", ["game_id"])
    .execute();

  await db.schema
    .createTable("rounds")
    .addColumn("game_id", "uuid")
    .addColumn("round", "integer", (col) => col.notNull())
    .addColumn("player1_move_id", "varchar", (col) => col.notNull())
    .addColumn("player2_move_id", "varchar", (col) => col.notNull())
    .addColumn("player3_move_id", "varchar")
    .addColumn("player4_move_id", "varchar")
    .addColumn("player5_move_id", "varchar")
    .addColumn("player6_move_id", "varchar")
    .addColumn("player1_target", "varchar", (col) => col.notNull())
    .addColumn("player2_target", "varchar", (col) => col.notNull())
    .addColumn("player3_target", "varchar")
    .addColumn("player4_target", "varchar")
    .addColumn("player5_target", "varchar")
    .addColumn("player6_target", "varchar")
    .addColumn("player1_position", "integer", (col) => col.notNull())
    .addColumn("player2_position", "integer", (col) => col.notNull())
    .addColumn("player3_position", "integer")
    .addColumn("player4_position", "integer")
    .addColumn("player5_position", "integer")
    .addColumn("player6_position", "integer")
    .addColumn("player1_points", "integer", (col) => col.notNull())
    .addColumn("player2_points", "integer", (col) => col.notNull())
    .addColumn("player3_points", "integer")
    .addColumn("player4_points", "integer")
    .addColumn("player5_points", "integer")
    .addColumn("player6_points", "integer")
    .addForeignKeyConstraint("foreign_key_game_id", ["game_id"], "games", [
      "game_id",
    ])
    .addPrimaryKeyConstraint("primary_key_rounds_table", ["game_id", "round"])
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable("archived_games").execute();
  await db.schema.dropTable("rounds").execute();
  await db.schema.dropTable("games").execute();
}
