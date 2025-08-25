// import { clientSchema } from "@/features/clients/schema/client.schema";
import { requiredString } from "@/shared/shcema/validation.schema";
import { z } from "zod";
import { invoiceLinesSchema } from "./invoice-lines.schema";

export const invoiceSchema = z.object({
	id: z.number(),
	customer: requiredString(50),
	invoice_type: z.enum(["0100000", "0200000"]),
	invoice_type_code: z.enum(["388", "383", "381", "386"]),
	issue_date: requiredString(50),
	issue_time: requiredString(50),
	document_currency_code: requiredString(50),
	discount_amount: z.union([z.number().min(1, "Required"), z.null()]),
	note: z.string().max(200).optional(),
	actual_delivery_date: requiredString(50),
	payment_means_code: requiredString(50),
	original_invoice_id: z.string().max(50).optional(),
	instruction_note: z.string().max(50).optional(),
	tax_rate: z.enum(["15", "0", ""]),
	classified_tax_category: z.enum(["Z", "S"]),
	tax_exemption_reason_code: z.string().max(50).optional(),
	tax_exemption_reason: z.string().max(50).optional(),
	invoice_lines: z.array(invoiceLinesSchema).min(1, "Required"),
	registration_name: z.string().max(50).optional(),
	party_identification_scheme: z.string().max(50).optional(),
	party_identification_value: z.string().max(50).optional(),
});

export const createInvoiceSchema = invoiceSchema.omit({ id: true });

export type TInvoiceDTO = z.infer<typeof invoiceSchema>;
export type TCreateTaxInvoiceDTO = z.infer<typeof createInvoiceSchema>;
