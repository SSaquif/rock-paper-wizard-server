import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable("sessions")
    .addColumn("session_id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`)
    )
    .addColumn("user_id", "varchar", (col) =>
      col.notNull().references("users.user_id").onDelete("cascade")
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("expires_at", "timestamp", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable("sessions").execute();
}
