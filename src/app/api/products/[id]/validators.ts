import * as yup from "yup";

const addProductSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  description: yup.string().trim().optional(),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  stock_level: yup
    .number()
    .required("Stock Level is required")
    .min(0, "Stock Level cannot be negative"),
  category_id: yup
    .number()
    .required("Category ID is required")
    .min(1, "Invalid Category ID"),
  image_url: yup
    .string()
    .trim()
    .url("Invalid URL format")
    .required("Image URL is required"),
});

export async function validateAddProductSchema(data: any) {
  try {
    const results = await addProductSchema.validate(data, {
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

const updateProductSchema = yup.object({
  name: yup.string().trim(),
  description: yup.string().trim().optional(),
  price: yup.number().min(0, "Price cannot be negative"),
  stock_level: yup.number().min(0, "Stock level cannot be negative"),
  category_id: yup.number().min(1, "Invalid Category ID"),
  image_url: yup
    .string()
    .trim()
    .url("Invalid URL format")
    .required("Image URL is required"),
});

export async function validateUpdateProduct(data: any) {
  try {
    const results = await updateProductSchema.validate(data, {
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
