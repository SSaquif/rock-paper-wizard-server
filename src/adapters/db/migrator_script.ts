// Use bun to run the migration script
// won't run into issues that I got using ts-node and tsc
import * as path from "path";
// bun manages to run if I do import {Pool} as pg
// but changed for consistency
import pg from "pg";
const { Pool } = pg;
import { promises as fs } from "fs";
import {
  Kysely,
  PostgresDialect,
  Migrator,
  FileMigrationProvider,
} from "kysely";
import { RockPaperWizardDatabase } from "./database.js";

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
      migrationFolder: path.join(__dirname, "migrations"),
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
