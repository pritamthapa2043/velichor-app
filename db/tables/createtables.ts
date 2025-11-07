import { pool } from "../config/config";
import { createTableAddress } from "./core/address";
import { createTableCartItems } from "./core/cartitems";
import { createTableCategory } from "./core/category";
import { createProductTable } from "./core/product";
import { createStoreTable } from "./core/store";
import { createUserTable } from "./core/user";
import { createWishlistTable } from "./core/wishlist";
import { createDeliveryTable } from "./delivery/delivery";
import { createDeliveryPersonTable } from "./delivery/delivery_person";
import { createAdminTable } from "./operators/admin";
import { createAuditLogsTable } from "./operators/audit_log";
import { createInventoryTable } from "./operators/inventory";
import { createOrderTable } from "./order/order";
import { createOrderItemsTable } from "./order/order_item";
import { createOrderstatusHistoryTable } from "./order/order_status_history";
import { createPaymentTable } from "./order/payment";

export const createtables = async () => {
  try {
    // core
    await pool.query(createUserTable);
    await pool.query(createTableAddress);
    await pool.query(createTableCategory);
    await pool.query(createProductTable);
    await pool.query(createStoreTable);
    await pool.query(createTableCartItems);
    await pool.query(createWishlistTable);

    // order
    await pool.query(createOrderTable);
    await pool.query(createOrderItemsTable);
    await pool.query(createOrderstatusHistoryTable);
    await pool.query(createPaymentTable);

    // delivery
    await pool.query(createDeliveryPersonTable);
    await pool.query(createDeliveryTable);

    // operators
    await pool.query(createAdminTable);
    await pool.query(createAuditLogsTable);
    await pool.query(createInventoryTable);

    console.log("All Table created successfully!");
  } catch (error: any) {
    console.error("Error creating Table:", error.message);
  }
};
