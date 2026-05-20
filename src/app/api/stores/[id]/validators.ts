import * as yup from "yup";
import { formatYupErrors } from "@/lib/formatYupErrors";

const addStoreSchema = yup.object({
  address: yup.string().trim().required("Address is required"),
  city: yup.string().trim().required("City is required"),
  state: yup.string().trim().required("State is required"),
  zipcode: yup.string().trim().required("Zip code is required"),
  manager_name: yup.string().trim().required("Manager name is required"),
});

export async function validateAddStoreSchema(data: unknown) {
  try {
    const results = await addStoreSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}

const updateStoreSchema = yup.object({
  address: yup.string().trim(),
  city: yup.string().trim(),
  state: yup.string().trim(),
  zipcode: yup.string().trim(),
  manager_name: yup.string().trim(),
});

export async function validateUpdateStore(data: unknown) {
  try {
    const results = await updateStoreSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    return { results, error: null };
  } catch (err: unknown) {
    return { results: null, error: formatYupErrors(err) };
  }
}
