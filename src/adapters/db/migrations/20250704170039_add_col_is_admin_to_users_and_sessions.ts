import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema
    .alterTable("users")
    .addColumn("is_admin", "boolean", (col) => col.defaultTo(false).notNull())
    .execute();

  await db.schema
    .alterTable("sessions")
    .addColumn("is_admin", "boolean", (col) => col.defaultTo(false).notNull())
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.alterTable("users").dropColumn("is_admin").execute();

  await db.schema.alterTable("sessions").dropColumn("is_admin").execute();
}
