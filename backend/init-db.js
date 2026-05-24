import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const host = process.env.DB_HOST || process.env.MYSQLHOST;
  const port = parseInt(process.env.DB_PORT || process.env.MYSQLPORT || "3306", 10);
  const user = process.env.DB_USER || process.env.MYSQLUSER || "root";
  const password = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD;
  const database = process.env.DB_NAME || process.env.MYSQLDATABASE || "railway";

  if (!host) {
    console.error("Error: DB_HOST / MYSQLHOST is empty in your environment! Please set it to your database host.");
    process.exit(1);
  }

  console.log(`Connecting to database ${database} at ${host}:${port}...`);

  try {
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      multipleStatements: true
    });

    console.log("Connected successfully!");

    // Read the schema.sql file from the parent directory
    const schemaPath = path.join(__dirname, "../schema.sql");
    let sql = fs.readFileSync(schemaPath, "utf8");

    // Remove the CREATE DATABASE and USE statements to avoid conflicts with Railway's default 'railway' database
    sql = sql.replace(/CREATE DATABASE[\s\S]*?USE\s+`?\w+`?;/i, "");

    console.log("Executing SQL schema...");
    await connection.query(sql);
    console.log("Database tables created successfully!");

    await connection.end();
    console.log("Done.");
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

run();
