import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import "dotenv/config";

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
