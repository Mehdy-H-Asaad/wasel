import { requiredString } from "@/shared/shcema/validation.schema";
import { z } from "zod";

export const invoiceLinesSchema = z.object({
	id: z.string().optional(),
	BaseAmount: requiredString(50),
	InvoicedQuantity: z.object({
		unitCode: requiredString(50),
		value: requiredString(50),
	}),
	DiscountAmount: z.string().max(50).optional(),
	LineExtensionAmount: requiredString(50),
	TaxAmount: requiredString(50),
	RoundingAmount: requiredString(50),
	TaxExemptionReasonCode: z.string().optional(),
	TaxExemptionReason: z.string().optional(),
	Name: requiredString(50),
});
