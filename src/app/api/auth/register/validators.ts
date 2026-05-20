import * as yup from "yup";
import { formatYupErrors } from "@/lib/formatYupErrors";

const registerSchema = yup.object({
  name: yup.string().required("Name is required").trim(),
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .trim()
    .min(6, "Phone number too short")
    .max(15, "Phone number too long")
    .nullable(),
  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export async function validateRegisterSchema(data: unknown) {
  try {
    const results = await registerSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}
