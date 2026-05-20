import * as yup from "yup";
import { formatYupErrors } from "@/lib/formatYupErrors";

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

export async function validateUpdateUser(data: unknown) {
  try {
    const results = await updateUserSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}
