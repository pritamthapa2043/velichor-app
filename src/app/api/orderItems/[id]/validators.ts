import * as yup from "yup";

const updateOrderItemSchema = yup.object({
  order_id: yup
    .number()
    .integer("Order ID must be an integer")
    .positive("Order ID must be positive"),

  product_id: yup
    .number()
    .integer("Product ID must be an integer")
    .positive("Product ID must be positive"),

  quantity: yup
    .number()
    .integer("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),

  unit_price: yup
    .number()
    .positive("Unit price must be greater than 0"),

  discount: yup
    .number()
    .min(0, "Discount cannot be negative")
    .default(0),

  total: yup
    .number()
    .positive("Total must be greater than 0"),

  updated_by: yup
    .string()
    .trim(),

  updated_at: yup
    .string()
    .matches(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
      "updated_at must be in ISO format"
    ),

  deleted_by: yup
    .string()
    .nullable()
    .trim(),

  deleted_at: yup
    .string()
    .nullable()
    .matches(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
      "deleted_at must be in ISO format"
    ),
});

export async function validateUpdateOrderItem(data: any) {
  try {
    const results = await updateOrderItemSchema.validate(data, {
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
