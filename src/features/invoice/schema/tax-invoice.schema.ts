import { z } from "zod";
import { invoiceSchema } from "./invoice.schema";
import { NO_TAX_RATE, TAX_RATE } from "../constants/invoice.constants";

export const taxInvoiceSchema = invoiceSchema.pick({
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

const BaseTaxInvoiceSchema = taxInvoiceSchema.omit({
	invoice_type_code: true,
	original_invoice_id: true,
	instruction_note: true,
	classified_tax_category: true,
	tax_rate: true,
});

const InvoiceTypeSchema = z.discriminatedUnion("invoice_type_code", [
	z.object({
		invoice_type_code: z.enum(["381", "383"]),
		original_invoice_id: z.string().min(1, "Original Invoice ID is required."),
		instruction_note: z.string().min(1, "Instruction Note is required."),
	}),
	z.object({
		invoice_type_code: z.literal("388"),
	}),
]);

const TaxCategorySchema = z.discriminatedUnion("classified_tax_category", [
	z.object({
		classified_tax_category: z.literal("Z"),
		tax_rate: z.literal(NO_TAX_RATE),
		tax_exemption_reason_code: z
			.string()
			.min(1, "Tax Exemption Reason Code is required."),
		tax_exemption_reason: z
			.string()
			.min(1, "Tax Exemption Reason is required."),
	}),
	z.object({
		classified_tax_category: z.literal("S"),
		tax_rate: z.literal(TAX_RATE),
	}),
]);

export const TaxInvoiceSchema =
	BaseTaxInvoiceSchema.and(InvoiceTypeSchema).and(TaxCategorySchema);

export const CreateTaxInvoiceSchema = BaseTaxInvoiceSchema.omit({ id: true })
	.and(InvoiceTypeSchema)
	.and(TaxCategorySchema);

export type TCreateTaxInvoiceDTO = z.infer<typeof CreateTaxInvoiceSchema>;
export type TTaxInvoiceDTO = z.infer<typeof TaxInvoiceSchema>;
