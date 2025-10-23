import { NextResponse } from "next/server";
import { pool } from "../config/config";
import { readdir, readFile } from "fs/promises";
import path from "path";
import fs from "fs";

const ERROR_CODE = "MIGRATION-01";

export const runMigrationScripts = async () => {
  try {
    const migrationDir = path.join(process.cwd(), "db/migration");

    // Get all files in migration directory
    const files = await readdir(migrationDir);

    // Filter only .sql files and sort them (001, 002, ...)
    const sqlFiles = files.filter((f) => f.endsWith(".sql")).sort();

    for (const file of sqlFiles) {
      const filePath = path.join(migrationDir, file);
      const sql = await readFile(filePath, "utf-8");

      console.log(`🚀 Running migration: ${file}`);
      await pool.query(sql);
      console.log(`✅ Migration ${file} applied successfully`);
    }

    console.log("🚀 All migrations applied successfully");
  } catch (err: any) {
    let message = "Something went wrong";

    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message, error_code: ERROR_CODE },
      { status: 500 }
    );
  }
};
