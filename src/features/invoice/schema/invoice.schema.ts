import { requiredString } from "@/shared/schema/validation.schema";
import { z } from "zod";
import {
	InvoiceLinesSchema,
	TBaseTaxInvoiceLineDTO,
} from "./invoice-lines.schema";
import { TAX_RATE, NO_TAX_RATE } from "../constants/invoice.constants";
import { TClientDTO } from "@/features/clients/types/client.types";

export const invoiceSchema = z.object({
	id: z.number(),
	customer: requiredString(50),
	invoice_type: z.enum(["0100000", "0200000"]),
	invoice_type_code: z.enum(["388", "383", "381", "386"]),
	issue_date: requiredString(50),
	issue_time: requiredString(50),
	document_currency_code: requiredString(50),
	discount_amount: z.number().min(1, "Required"),
	note: z.string().max(200).optional(),
	actual_delivery_date: requiredString(50),
	payment_means_code: requiredString(50),
	original_invoice_id: z.string().max(50).optional(),
	instruction_note: z.string().max(50).optional(),
	tax_rate: z.union([z.literal(TAX_RATE), z.literal(NO_TAX_RATE)]),
	classified_tax_category: z.enum(["Z", "S"]),
	tax_exemption_reason_code: z.string().max(50).optional(),
	tax_exemption_reason: z.string().max(50).optional(),
	invoice_lines: z.array(InvoiceLinesSchema).min(1, "Required"),
	registration_name: z.string().max(50).optional(),
	line_extension_amount: z.number().min(1, "Required"),
	tax_amount: z.number().min(1, "Required"),
	tax_inclusive_amount: z.number().min(1, "Required"),
	taxable_amount: z.number().min(1, "Required"),
	party_identification_scheme: z.string().max(50).optional(),
	party_identification_value: z.string().max(50).optional(),
});

export type TInvoiceDTO = Omit<
	z.infer<typeof invoiceSchema>,
	"customer" | "invoice_lines"
> & {
	customer: TClientDTO;
	invoice_lines: TBaseTaxInvoiceLineDTO[];
};
