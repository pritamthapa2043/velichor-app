import * as yup from "yup";

const updateUserSchema = yup.object({
  name: yup.string().optional(),
  email: yup.string().email("Invalid email format").optional(),
  phone: yup
    .string()
    .min(6, "Phone number too short")
    .max(15, "Phone number too long")
    .optional(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

export async function validateUpdateUser(data: any) {
  try {
    const results = await updateUserSchema.validate(data, {
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
