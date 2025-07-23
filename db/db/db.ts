import "dotenv/config";
import { Client } from "pg";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

export default async function createDatabase() {
  const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: "postgres",
    password: DB_PASSWORD,
    port: Number(DB_PORT),
  });

  try {
    await client.connect();

    const checkDbExists = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );

    if (checkDbExists.rowCount && checkDbExists.rowCount > 0) {
      console.log(`Database "${DB_NAME}" already exists.`);
      return;
    }

    await client.query(`CREATE DATABASE "${DB_NAME}"`);
    console.log(`Database "${DB_NAME}" created successfully.`);
    return;
  } catch (error) {
    console.error("Failed to create database:", error);
  } finally {
    await client.end();
  }
}
