import * as path from "path";
import { Pool } from "pg";
import { promises as fs } from "fs";
import {
  Kysely,
  PostgresDialect,
  Migrator,
  FileMigrationProvider,
} from "kysely";
import { RockPaperWizardDatabase } from "./database";

async function migrateToLatest() {
  const db = new Kysely<RockPaperWizardDatabase>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(import.meta.dir, "migrations"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`Migration ${it.migrationName} was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`Migration ${it.migrationName} failed`);
    }
  });

  if (error) {
    console.error("Failed to migrate to latest version");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
