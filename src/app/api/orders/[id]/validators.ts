import * as yup from "yup";

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

export async function validateUpdateOrder(data: any) {
  try {
    const results = await updateOrderSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { results, error: null };
  } catch (err: any) {
    const error: { [key: string]: string[] } = {};
    if (err.name === "ValidationError") {
      err.inner.forEach((e: any) => {
        if (!error[e.path]) error[e.path] = [];
        error[e.path].push(e.message);
      });
    }
    return { results: null, error };
  }
}
