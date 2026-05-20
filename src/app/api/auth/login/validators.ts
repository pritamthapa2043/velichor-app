import * as yup from "yup";
import { formatYupErrors } from "@/lib/formatYupErrors";

const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export async function validateLoginSchema(data: unknown) {
  try {
    const results = await loginSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}
