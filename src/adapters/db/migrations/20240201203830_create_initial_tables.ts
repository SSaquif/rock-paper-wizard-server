import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db);
  await db.schema
    .createTable("games")
    .addColumn("game_id", "uuid", (col) =>
      col
        .primaryKey()
        .defaultTo(sql`uuid_generate_v4()`)
        .notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("number_of_players", "integer", (col) => col.notNull())
    .addColumn("current_round", "integer", (col) => col.notNull())
    .addColumn("game_status", "varchar", (col) => col.notNull())
    .addColumn("player_1", "varchar", (col) => col.notNull())
    .addColumn("player_2", "varchar")
    .addColumn("player_3", "varchar")
    .addColumn("player_4", "varchar")
    .addColumn("player_5", "varchar")
    .addColumn("player_6", "varchar")
    .addColumn("player_order", sql`text[]`)
    .addColumn("round_starter", "varchar") // might be a redundant col but a card could have an effect that changes the round starter
    .addColumn("unselected_colors", sql`text[]`)
    .addColumn("player_1_color", "varchar", (col) => col.notNull())
    .addColumn("player_2_color", "varchar")
    .addColumn("player_3_color", "varchar")
    .addColumn("player_4_color", "varchar")
    .addColumn("player_5_color", "varchar")
    .addColumn("player_6_color", "varchar")
    .addColumn("player_1_points", "integer", (col) => col.notNull())
    .addColumn("player_2_points", "integer")
    .addColumn("player_3_points", "integer")
    .addColumn("player_4_points", "integer")
    .addColumn("player_5_points", "integer")
    .addColumn("player_6_points", "integer")
    .addColumn("player_1_position", "integer", (col) => col.notNull())
    .addColumn("player_2_position", "integer")
    .addColumn("player_3_position", "integer")
    .addColumn("player_4_position", "integer")
    .addColumn("player_5_position", "integer")
    .addColumn("player_6_position", "integer")
    .addColumn("cards_in_play", sql`integer[]`)
    .addColumn("cards_in_deck", sql`integer[]`)
    .addColumn("discard_pile", sql`integer[]`)
    .execute();

  await db.schema
    .createTable("rounds")
    .addColumn("game_id", "uuid")
    .addColumn("round", "integer", (col) => col.notNull())
    .addColumn("player_1_card_id", "integer", (col) => col.notNull())
    .addColumn("player_2_card_id", "integer", (col) => col.notNull())
    .addColumn("player_3_card_id", "integer")
    .addColumn("player_4_card_id", "integer")
    .addColumn("player_5_card_id", "integer")
    .addColumn("player_6_card_id", "integer")
    .addColumn("player_1_target", "varchar", (col) => col.notNull())
    .addColumn("player_2_target", "varchar", (col) => col.notNull())
    .addColumn("player_3_target", "varchar")
    .addColumn("player_4_target", "varchar")
    .addColumn("player_5_target", "varchar")
    .addColumn("player_6_target", "varchar")
    .addColumn("player_1_points", "integer", (col) => col.notNull())
    .addColumn("player_2_points", "integer", (col) => col.notNull())
    .addColumn("player_3_points", "integer")
    .addColumn("player_4_points", "integer")
    .addColumn("player_5_points", "integer")
    .addColumn("player_6_points", "integer")
    .addForeignKeyConstraint("foreign_key_game_id", ["game_id"], "games", [
      "game_id",
    ])
    .addPrimaryKeyConstraint("primary_key_rounds_table", ["game_id", "round"])
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable("rounds").execute();
  await db.schema.dropTable("games").execute();
}
