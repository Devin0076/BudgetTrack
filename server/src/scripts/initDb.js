const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../../.env") });
const fs = require("fs");
const pool = require("../db");

async function run() {
  const sqlPath = path.join(__dirname, "../../sql/001_create_users.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");

  await pool.query(sql);
  console.log("Database initialized. Users table created.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Database initialization failed:", err);
  process.exit(1);
});