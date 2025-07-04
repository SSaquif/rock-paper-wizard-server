import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema
    .alterTable("rpw_rounds")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema
    .alterTable("rpw_rounds")
    .dropColumn("created_at")
    .dropColumn("updated_at")
    .execute();
}
