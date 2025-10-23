import * as yup from "yup";

const addCategorySchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  description: yup.string().trim().required("Description is required"),
});

export async function validateAddCategorySchema(data: any) {
  try {
    const results = await addCategorySchema.validate(data, {
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

const updateCategorySchema = yup.object({
  name: yup.string().trim(),
  description: yup.string().trim(),
});

export async function validateUpdateCategory(data: any) {
  try {
    const results = await updateCategorySchema.validate(data, {
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
