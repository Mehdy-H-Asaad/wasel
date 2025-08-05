// import { clientSchema } from "@/features/clients/schema/client.schema";
import { requiredString } from "@/shared/shcema/validation.schema";
import { z } from "zod";
import { invoiceLinesSchema } from "./invoice-lines.schema";

export const invoiceSchema = z.object({
	SellerInfo: requiredString(50),
	BuyerInfo: requiredString(50),
	InvoiceType: z.enum(["0100000", "0200000"]),
	InvoiceTypeCode: z.enum(["388", "383", "381", "386"]),
	IssueDate: requiredString(50),
	IssueTime: requiredString(50),
	DocumentCurrencyCode: requiredString(50),
	LineExtensionAmount: requiredString(50),
	DiscountAmount: z.string().max(50).optional(),
	TaxableAmount: requiredString(50),
	TaxAmount: requiredString(50),
	TaxInclusiveAmount: requiredString(50),
	PayableAmount: requiredString(50),
	Note: z.string().max(200).optional(),
	ActualDeliveryDate: requiredString(50),
	PaymentMeansCode: requiredString(50),
	OriginalInvoiceID: z.string().max(50).optional(),
	InstructionNote: z.string().max(50).optional(),
	TaxRate: z.enum(["15", "0", ""]),
	ClassifiedTaxCategory: z.enum(["Z", "S"]),
	invoiceLines: z.array(invoiceLinesSchema).min(1, "Required"),
});
