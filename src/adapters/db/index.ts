import pg from "pg";
const { Pool } = pg;
import { Kysely, PostgresDialect } from "kysely";
import "dotenv/config";
import { RockPaperWizardDatabase } from "./database.js";

// postgres dialect
const dialect = new PostgresDialect({
  pool: new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    max: 10,
  }),
});

// DB instatiation
export const db = new Kysely<RockPaperWizardDatabase>({
  dialect,
});
