import { pool } from "../config/config";
import {
  createCoreSchema,
  createDeliverySchema,
  createEngagementSchema,
  createOperatorsSchema,
  createOrderSchema,
} from "./schema";

export const createSchema = async () => {
  try {
    await pool.query(createCoreSchema);
    await pool.query(createOrderSchema);
    await pool.query(createDeliverySchema);
    await pool.query(createOperatorsSchema);
    await pool.query(createEngagementSchema);

    console.log("All Schema created successfully!");
  } catch (error: unknown) {
    console.error("Error creating Schema:", error.message);
  }
};
