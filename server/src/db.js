const { Pool } = require("pg");

const isTest = process.env.NODE_ENV === "test";

const connectionString = isTest
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL;

const ssl =
  connectionString && connectionString.includes("render.com")
    ? { rejectUnauthorized: false }
    : false;

const pool = new Pool({
  connectionString,
  ssl,
});

pool.on("connect", async (client) => {
  if (!isTest) return;

  const schema = process.env.TEST_DB_SCHEMA || "test_schema";
  await client.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
  await client.query(`SET search_path TO ${schema}, public`);
});

module.exports = pool;