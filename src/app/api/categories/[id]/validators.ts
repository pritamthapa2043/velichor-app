import * as yup from "yup";
import { formatYupErrors } from "@/lib/formatYupErrors";

const addCategorySchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  description: yup.string().trim().required("Description is required"),
});

export async function validateAddCategorySchema(data: unknown) {
  try {
    const results = await addCategorySchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}

const updateCategorySchema = yup.object({
  name: yup.string().trim(),
  description: yup.string().trim(),
});

export async function validateUpdateCategory(data: unknown) {
  try {
    const results = await updateCategorySchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}
