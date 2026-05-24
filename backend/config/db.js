import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || process.env.MYSQLHOST || "localhost",
  user: process.env.DB_USER || process.env.MYSQLUSER || "root",
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : (process.env.MYSQLPASSWORD || "root"),
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || "journal_app",
  port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT || "3306", 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("MySQL Connected successfully via connection pool");
    connection.release();
  }
});

export default db;