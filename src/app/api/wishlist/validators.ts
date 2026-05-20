import * as yup from "yup";
import { formatYupErrors } from "@/lib/formatYupErrors";

const addWishlistItemSchema = yup.object({
  product_id: yup
    .number()
    .typeError("product_id must be a number")
    .required("Product ID is required")
    .min(1, "Invalid Product ID"),
});

export async function validateAddWishlistItem(data: unknown) {
  try {
    const results = await addWishlistItemSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}
