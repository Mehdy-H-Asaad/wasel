import { z } from "zod";

export const BaseInvoiceLinesSchema = z.object({
  item_id: z.number().min(1, "Required"),
  item_name: z.string().min(1, "Required"),
  item_price: z
    .number({
      required_error: "Required",
      invalid_type_error: "Required",
    })
    .min(1, {
      message: "Required",
    }),
  discount_amount: z
    .number({
      required_error: "Required",
      invalid_type_error: "Required",
    })
    .optional(),
  tax_exemption_reason_code: z.string().nullable().optional(),
  tax_exemption_reason: z.string().nullable().optional(),
  quantity: z
    .number({
      required_error: "Required",
      invalid_type_error: "Required",
    })
    .min(1, {
      message: "Required",
    }),
  price_discount: z.number().optional(),
  item_unit_code: z.string().min(1, "Required"),
  line_extension_amount: z.number().min(1, "Required"),
  // tax_rate: z.number().min(1, "Required"),
  tax_amount: z.number().min(1, "Required"),
  classified_tax_category: z.enum(["Z", "S", "E", "O"]),
  description: z.string().nullable().optional(),
  rounding_amount: z.number().min(1, "Required"),
});

export const InvoiceLinesSchema = (isSaleInvoice: boolean) =>
  BaseInvoiceLinesSchema.omit({
    item_name: true,
    // item_price: true,
    item_unit_code: true,
    tax_amount: true,
    rounding_amount: true,
    line_extension_amount: true,
  }).superRefine((data, ctx) => {
    if (
      (data.classified_tax_category === "Z" ||
        data.classified_tax_category === "O" ||
        data.classified_tax_category === "E") &&
      isSaleInvoice
    ) {
      if (!data.tax_exemption_reason_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["tax_exemption_reason_code"],
        });
      }

      if (
        data.classified_tax_category === "O" &&
        !data.tax_exemption_reason &&
        isSaleInvoice
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["tax_exemption_reason"],
        });
      }
    }

    if (data.discount_amount && data.discount_amount > data.item_price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Discount amount cannot be greater than item price",
        path: ["discount_amount"],
      });
    }
  });

export const CreateInvoiceLinesSchema = (isSaleInvoice: boolean) =>
  BaseInvoiceLinesSchema.omit({
    item_name: true,
    item_unit_code: true,
    tax_amount: true,
    rounding_amount: true,
    line_extension_amount: true,
  }).superRefine((data, ctx) => {
    if (
      (data.classified_tax_category === "Z" ||
        data.classified_tax_category === "O" ||
        data.classified_tax_category === "E") &&
      isSaleInvoice
    ) {
      if (!data.tax_exemption_reason_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["tax_exemption_reason_code"],
        });
      }

      if (
        data.classified_tax_category === "O" &&
        !data.tax_exemption_reason &&
        isSaleInvoice
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["tax_exemption_reason"],
        });
      }
    }
  });

export const UpdateInvoiceLinesSchema = BaseInvoiceLinesSchema.omit({
  item_name: true,
  item_unit_code: true,
  tax_amount: true,
  rounding_amount: true,
  line_extension_amount: true,
}).superRefine((data, ctx) => {
  if (
    data.classified_tax_category === "Z" ||
    data.classified_tax_category === "O" ||
    data.classified_tax_category === "E"
  ) {
    if (!data.tax_exemption_reason_code) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["tax_exemption_reason_code"],
      });
    }

    // For "O" category, tax exemption reason text is also required
    if (data.classified_tax_category === "O" && !data.tax_exemption_reason) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["tax_exemption_reason"],
      });
    }
  }
});

export type TBaseTaxInvoiceLineDTO = z.infer<typeof BaseInvoiceLinesSchema>;
export type TTaxInvoiceLineDTO = z.infer<ReturnType<typeof InvoiceLinesSchema>>;
export type TCreateTaxInvoiceLineDTO = z.infer<
  ReturnType<typeof CreateInvoiceLinesSchema>
>;
export type TUpdateTaxInvoiceLineDTO = z.infer<typeof UpdateInvoiceLinesSchema>;
export type TInvoiceLineDTO = z.infer<ReturnType<typeof InvoiceLinesSchema>>;
