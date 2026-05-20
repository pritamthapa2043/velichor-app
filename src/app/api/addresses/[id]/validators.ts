import * as yup from "yup";
import { formatYupErrors } from "@/lib/formatYupErrors";

const addAddressSchema = yup.object({
  user_id: yup
    .number()
    .required("User ID is required")
    .min(1, "Invalid User ID"),
  line1: yup.string().trim().required("Address Line 1 is required"),
  line2: yup.string().trim().optional(),
  city: yup.string().trim().required("City is required"),
  state: yup.string().trim().required("State is required"),
  pincode: yup
    .string()
    .trim()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be 6 digits"),
});

export async function validateAddAddressSchema(data: unknown) {
  try {
    const results = await addAddressSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}

const updateAddressSchema = yup.object({
  user_id: yup.number().min(1, "Invalid User ID"),
  line1: yup.string().trim(),
  line2: yup.string().trim(),
  city: yup.string().trim(),
  state: yup.string().trim(),
  pincode: yup
    .string()
    .trim()
    .matches(/^\d{6}$/, "Pincode must be 6 digits"),
});

export async function validateUpdateAddress(data: unknown) {
  try {
    const results = await updateAddressSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}
