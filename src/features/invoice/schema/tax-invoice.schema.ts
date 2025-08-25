import { z } from "zod";
import { invoiceSchema } from "./invoice.schema";

export const taxInvoiceSchmea = invoiceSchema.pick({
	id: true,
	customer: true,
	invoice_type: true,
	invoice_type_code: true,
	issue_date: true,
	issue_time: true,
	document_currency_code: true,
	discount_amount: true,
	actual_delivery_date: true,
	payment_means_code: true,
	note: true,
	instruction_note: true,
	original_invoice_id: true,
	classified_tax_category: true,
	tax_rate: true,
	invoice_lines: true,
});

export const createTaxInvoiceSchema = taxInvoiceSchmea
	.omit({ id: true })
	.superRefine((data, ctx) => {
		if (data.invoice_type_code === "381" || data.invoice_type_code === "383") {
			if (!data.original_invoice_id) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["original_invoice_id"],
					message: "Original Invoice ID is required for credit or debit notes.",
				});
			}
			if (!data.instruction_note) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["instruction_note"],
					message: "Instruction Note is required for credit or debit notes.",
				});
			}
		}
	});

export type TCreateTaxInvoiceDTO = Omit<z.infer<typeof taxInvoiceSchmea>, "id">;
export type TTaxInvoiceDTO = z.infer<typeof taxInvoiceSchmea>;
