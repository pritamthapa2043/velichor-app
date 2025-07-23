import "dotenv/config";
import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
};

const pool = new Pool(dbConfig);

export async function query<T extends QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const tempClient: PoolClient = await pool.connect();
  try {
    const res = await tempClient.query<T>(text, params);
    return res;
  } finally {
    tempClient.release();
  }
}

export { pool };
