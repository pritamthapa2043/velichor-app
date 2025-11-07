import * as yup from "yup";

const addWishlistItemSchema = yup.object({
  product_id: yup
    .number()
    .typeError("product_id must be a number")
    .required("Product ID is required")
    .min(1, "Invalid Product ID"),
});

export async function validateAddWishlistItem(data: any) {
  try {
    const results = await addWishlistItemSchema.validate(data, {
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
