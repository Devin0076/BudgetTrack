const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../../.env") });
const fs = require("fs");
const pool = require("../db");

async function run() {
  const usersSqlPath = path.join(__dirname, "../../sql/001_create_users.sql");
  const txSqlPath = path.join(__dirname, "../../sql/002_create_transactions.sql");

  const usersSql = fs.readFileSync(usersSqlPath, "utf8");
  const txSql = fs.readFileSync(txSqlPath, "utf8");

  await pool.query(usersSql);
  await pool.query(txSql);

  console.log("Database initialized. Users and transactions tables created.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Database initialization failed:", err);
  process.exit(1);
});