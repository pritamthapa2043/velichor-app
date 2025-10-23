import * as yup from "yup";

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

export async function validateAddAddressSchema(data: any) {
  try {
    const results = await addAddressSchema.validate(data, {
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

export async function validateUpdateAddress(data: any) {
  try {
    const results = await updateAddressSchema.validate(data, {
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
