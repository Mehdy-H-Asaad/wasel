import { z } from "zod";

export const BaseInvoiceLinesSchema = z.object({
	item_id: z.number().min(1, "Required"), // YES
	item_name: z.string().min(1, "Required"),
	item_price: z.number().min(1, "Required"), // YES
	discount_amount: z.number().optional(), // YES
	tax_exemption_reason_code: z.string().optional(), // YES
	tax_exemption_reason: z.string().optional(), // YES
	quantity: z.number().min(1, "Required"), // YES
	price_discount: z.number().optional(), // YES
	item_unit_code: z.string().min(1, "Required"),
	line_extension_amount: z.number().min(1, "Required"),
	// tax_rate: z.number().min(1, "Required"), // YES
	tax_amount: z.number().min(1, "Required"),
	classified_tax_category: z.enum(["Z", "S", "E", "O"]), // YES
	description: z.string().optional(), // YES
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
	item_price: true,
	item_unit_code: true,
	tax_amount: true,
	rounding_amount: true,
	line_extension_amount: true,
});

export const UpdateInvoiceLinesSchema = BaseInvoiceLinesSchema.omit({
	item_name: true,
	item_price: true,
	item_unit_code: true,
	tax_amount: true,
	rounding_amount: true,
	line_extension_amount: true,
});

export type TBaseTaxInvoiceLineDTO = z.infer<typeof BaseInvoiceLinesSchema>;
export type TTaxInvoiceLineDTO = z.infer<typeof InvoiceLinesSchema>;
export type TCreateTaxInvoiceLineDTO = z.infer<typeof CreateInvoiceLinesSchema>;
export type TUpdateTaxInvoiceLineDTO = z.infer<typeof UpdateInvoiceLinesSchema>;
export type TInvoiceLineDTO = z.infer<typeof InvoiceLinesSchema>;
