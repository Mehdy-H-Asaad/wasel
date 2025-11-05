import { z } from "zod";

export const BaseInvoiceLinesSchema = z.object({
  item_id: z.number().min(1, "Required"),
  item_name: z.string().min(1, "Required"),
  item_price: z.number().min(1, "Required"),
  discount_amount: z.number().optional(),
  tax_exemption_reason_code: z.string().optional(),
  tax_exemption_reason: z.string().optional(),
  quantity: z.number().min(1, "Required"),
  price_discount: z.number().optional(),
  item_unit_code: z.string().min(1, "Required"),
  line_extension_amount: z.number().min(1, "Required"),
  // tax_rate: z.number().min(1, "Required"),
  tax_amount: z.number().min(1, "Required"),
  classified_tax_category: z.enum(["Z", "S", "E", "O"]),
  description: z.string().optional(),
  rounding_amount: z.number().min(1, "Required"),
});

export const InvoiceLinesSchema = BaseInvoiceLinesSchema.omit({
  item_name: true,
  // item_price: true,
  item_unit_code: true,
  tax_amount: true,
  rounding_amount: true,
  line_extension_amount: true,
});

export const CreateInvoiceLinesSchema = BaseInvoiceLinesSchema.omit({
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
        message: "Tax exemption reason code is required for this tax category",
        path: ["tax_exemption_reason_code"],
      });
    }

    if (data.classified_tax_category === "O" && !data.tax_exemption_reason) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tax exemption reason is required for this tax category",
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
        message: "Tax exemption reason code is required for this tax category",
        path: ["tax_exemption_reason_code"],
      });
    }

    // For "O" category, tax exemption reason text is also required
    if (data.classified_tax_category === "O" && !data.tax_exemption_reason) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tax exemption reason is required for this tax category",
        path: ["tax_exemption_reason"],
      });
    }
  }
});

export type TBaseTaxInvoiceLineDTO = z.infer<typeof BaseInvoiceLinesSchema>;
export type TTaxInvoiceLineDTO = z.infer<typeof InvoiceLinesSchema>;
export type TCreateTaxInvoiceLineDTO = z.infer<typeof CreateInvoiceLinesSchema>;
export type TUpdateTaxInvoiceLineDTO = z.infer<typeof UpdateInvoiceLinesSchema>;
export type TInvoiceLineDTO = z.infer<typeof InvoiceLinesSchema>;
