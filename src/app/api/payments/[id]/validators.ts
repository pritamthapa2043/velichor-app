import * as yup from "yup";

// Define allowed payment types and statuses
const paymentTypes = ["credit_card", "paypal", "bank_transfer"];
const paymentStatuses = ["PENDING", "PAID", "FAILED"];

const updatePaymentSchema = yup.object({
  order_id: yup
    .number()
    .integer("Order ID must be an integer")
    .positive("Order ID must be positive")
    .required("Order ID is required"),

  type: yup
    .string()
    .oneOf(paymentTypes, `Type must be one of: ${paymentTypes.join(", ")}`)
    .required("Payment type is required"),

  amount: yup
    .number()
    .positive("Amount must be greater than 0")
    .required("Amount is required"),

  status: yup
    .string()
    .oneOf(paymentStatuses, `Status must be one of: ${paymentStatuses.join(", ")}`)
    .required("Payment status is required"),

  transaction_id: yup
    .string()
    .when("status", {
      is: "PAID",
      then: (schema) => schema.required("Transaction ID is required when payment is PAID"),
      otherwise: (schema) => schema.notRequired(),
    }),

  paid_at: yup
    .date()
    .nullable()
    .when("status", {
      is: "PAID",
      then: (schema) => schema.required("Paid date is required when payment is PAID"),
      otherwise: (schema) => schema.notRequired(),
    }),

  updated_by: yup
    .string()
    .required("Updated by is required"),
});

export async function validateUpdatePayment(data: any) {
  try {
    const results = await updatePaymentSchema.validate(data, {
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
