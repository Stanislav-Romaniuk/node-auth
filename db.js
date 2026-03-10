import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DB_URL
});

//=================
// CONNECT TO DB
//=================
export async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("DB connected:", res.rows[0]);
  } catch (error) {
    console.error("Connection error:", error.message);
    process.exit(1);
  }
}

//==================
// CREATE TABLE
//===================
export async function initializeDatabase() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Users table is ready.");
  } catch (error) {
    console.error("Database initialization error:", error.message);
    process.exit(1);
  }
}

//=======================
// CHECK USERS
//=======================
export async function checkUsers() {
  try {
    const res = await pool.query(`
      SELECT id, username, password_hash, created_at
      FROM users
      ORDER BY id DESC
    `);

    if (res.rows.length === 0) {
      console.log("Database is empty");
      return;
    }

    console.table(res.rows);
  } catch (error) {
    console.error("List error:", error.message);
  }
}