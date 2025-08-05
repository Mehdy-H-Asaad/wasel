import { z } from "zod";
import { invoiceSchema } from "./invoice.schema";

export const taxInvoiceSchmea = invoiceSchema
	.pick({
		SellerInfo: true,
		BuyerInfo: true,
		InvoiceType: true,
		InvoiceTypeCode: true,
		IssueDate: true,
		IssueTime: true,
		DocumentCurrencyCode: true,
		LineExtensionAmount: true,
		DiscountAmount: true,
		TaxableAmount: true,
		TaxAmount: true,
		TaxInclusiveAmount: true,
		PayableAmount: true,
		ActualDeliveryDate: true,
		PaymentMeansCode: true,
		Note: true,
		InstructionNote: true,
		OriginalInvoiceID: true,
		ClassifiedTaxCategory: true,
		TaxRate: true,
		invoiceLines: true,
	})
	.superRefine((data, ctx) => {
		if (data.InvoiceTypeCode === "381" || data.InvoiceTypeCode === "383") {
			if (!data.OriginalInvoiceID) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["OriginalInvoiceID"],
					message: "Original Invoice ID is required for credit or debit notes.",
				});
			}
			if (!data.InstructionNote) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["InstructionNote"],
					message: "Instruction Note is required for credit or debit notes.",
				});
			}
		}
	});

export type TCreateTaxInvoiceDTO = z.infer<typeof taxInvoiceSchmea>;
