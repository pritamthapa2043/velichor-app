import createDatabase from "../db/db";
import { createSchema } from "../schema/createSchema";
import { createtables } from "../tables/createtables";

const runCreateDb = async () => {
  try {
    console.log("🚀 Running Migrations...");
    console.log("🚀 Creating Database...");
    await createDatabase();
    console.log("🚀 Creating Schema...");
    await createSchema();
    console.log("🚀 Creating Tables...");
    await createtables();

    process.exit(0); // Exit successfully after migrations complete
  } catch (error: unknown) {
    console.error("❌ Migration Failed:", error);
    process.exit(1); // Exit with failure code on error
  }
};

runCreateDb();
