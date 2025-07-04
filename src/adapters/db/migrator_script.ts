/*
 * Use bun to run the migration script
 * won't run into issues that I got using ts-node and tsc
 * Need to run this script from the
 * root of the project containing
 * the .env file
 */
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
  MigrationResultSet,
} from "kysely";
import { BoardGamesDatabase } from "./database.js";

async function migrateToLatest() {
  const db = new Kysely<BoardGamesDatabase>({
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

  let migrationResult: null | MigrationResultSet = null;
  if (process.argv.includes("--up")) {
    migrationResult = await migrator.migrateUp();
  } else if (process.argv.includes("--down")) {
    migrationResult = await migrator.migrateDown();
  } else if (process.argv.includes("--pending")) {
    const migrationInfo = await migrator.getMigrations();
    const pendingMigrations = migrationInfo.filter((mi) => !mi.executedAt);
    if (pendingMigrations.length === 0) {
      console.log("No pending migrations");
    } else {
      console.log("Pending migrations:");
      pendingMigrations.forEach((mi) => {
        console.log(mi.name);
      });
    }
    db.destroy();
    process.exit(0);
  } else if (process.argv.includes("--list")) {
    const migrationInfo = await migrator.getMigrations();
    console.log("Migrations:");
    migrationInfo.forEach((mi) => {
      console.log(`${mi.name} - ${mi.executedAt || "Pending"}`);
    });
    db.destroy();
    process.exit(0);
  } else if (process.argv.length !== 2) {
    console.error(
      "--up, --down, --pending, --list must be provided as the only extra arguments"
    );
    console.error(
      "to run the all pending migrations run the script without any extra arguments"
    );
    db.destroy();
    process.exit(1);
  } else {
    migrationResult = await migrator.migrateToLatest();
  }

  const { error, results } = migrationResult;

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(
        `Migration ${it.migrationName} was successfully migrated ${it.direction}`
      );
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
