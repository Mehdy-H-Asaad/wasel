import { z } from "zod";

export const invoiceLinesSchema = z.object({
	item_id: z.number().min(1, "Required"),
	discount_amount: z.number().optional(),
	tax_exemption_reason_code: z.string().optional(),
	tax_exemption_reason: z.string().optional(),
	quantity: z.number().min(1, "Required"),
});

export type TTaxInvoiceLineDTO = z.infer<typeof invoiceLinesSchema>;
export type TCreateTaxInvoiceLineDTO = z.infer<typeof invoiceLinesSchema>;
export type TUpdateTaxInvoiceLineDTO = TCreateTaxInvoiceLineDTO;
