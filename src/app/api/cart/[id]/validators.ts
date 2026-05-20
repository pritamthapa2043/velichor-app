import * as yup from "yup";
import { formatYupErrors } from "@/lib/formatYupErrors";

const addCartItemSchema = yup.object({
  product_id: yup
    .number()
    .typeError("product_id must be a number")
    .required("Product ID is required")
    .min(1, "Invalid Product ID"),
  quantity: yup
    .number()
    .typeError("quantity must be a number")
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1"),
  size: yup.string().trim().max(20, "Size is too long").optional(),
  color: yup.string().trim().max(50, "Color is too long").optional(),
});

export async function validateAddCartItemSchema(data: unknown) {
  try {
    const results = await addCartItemSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}

const updateCartItemSchema = yup.object({
  quantity: yup
    .number()
    .typeError("quantity must be a number")
    .min(1, "Quantity must be at least 1")
    .optional(),
  size: yup.string().trim().max(20, "Size is too long").optional(),
  color: yup.string().trim().max(50, "Color is too long").optional(),
});

export async function validateUpdateCartItem(data: unknown) {
  try {
    const results = await updateCartItemSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}
