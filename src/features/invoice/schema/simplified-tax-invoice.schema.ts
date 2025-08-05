import { z } from "zod";
import { invoiceSchema } from "./invoice.schema";

export const buyerInfoSchema = z
	.object({
		PartyIdentification: z.object({
			schemeID: z.string().max(50),
			value: z.string().max(50),
		}),
		RegistrationName: z.string().max(50),
	})
	.optional();

export const simplifiedTaxInvoiceSchema = invoiceSchema
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
	.extend({
		BuyerInfo: buyerInfoSchema.optional(),
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
		if (data.ClassifiedTaxCategory === "Z") {
			if (!data.BuyerInfo?.RegistrationName) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["BuyerInfo.RegistrationName"],
					message: "Client Name is required for simplified tax invoice.",
				});
			}
			if (!data.BuyerInfo?.PartyIdentification.value) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["BuyerInfo.PartyIdentification.value"],
					message: "National ID is required for simplified tax invoice.",
				});
			}
		}
	});

export type TCreateSimplifiedTaxInvoiceDTO = z.infer<
	typeof simplifiedTaxInvoiceSchema
>;
