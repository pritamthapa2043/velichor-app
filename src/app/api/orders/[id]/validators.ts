import * as yup from "yup";
import { formatYupErrors } from "@/lib/formatYupErrors";

const updateOrderSchema = yup.object({
  user_id: yup
    .number()
    .integer("User ID must be an integer")
    .positive("User ID must be positive")
    .required("User ID is required"),

  store_id: yup
    .number()
    .integer("Store ID must be an integer")
    .positive("Store ID must be positive")
    .required("Store ID is required"),

  delivery_address_id: yup
    .number()
    .integer("Delivery address ID must be an integer")
    .positive("Delivery address ID must be positive")
    .required("Delivery address ID is required"),

  status: yup
    .string()
    .oneOf(["pending", "shipped", "delivered", "cancelled"], "Invalid status")
    .required("Status is required"),

  total_amount: yup
    .number()
    .positive("Total amount must be greater than 0")
    .required("Total amount is required"),
});

export async function validateUpdateOrder(data: unknown) {
  try {
    const results = await updateOrderSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}
