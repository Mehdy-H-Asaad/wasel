import { z } from "zod";
import { invoiceSchema } from "./invoice.schema";
import { NO_TAX_RATE, TAX_RATE } from "../constants/invoice.constants";

export const simplifiedTaxInvoiceSchema = invoiceSchema.pick({
  id: true,
  // customer: true,
  invoice_type: true,
  invoice_type_code: true,
  issue_date: true,
  issue_time: true,
  document_currency_code: true,
  actual_delivery_date: true,
  payment_means_code: true,
  note: true,
  // instruction_note: true,
  // original_invoice_id: true,
  tax_rate: true,
  invoice_lines: true,
  registration_name: true,
  party_identification_scheme: true,
  party_identification_value: true,
});

const BaseSimplifiedTaxInvoiceSchema = simplifiedTaxInvoiceSchema.omit({
  invoice_type_code: true,
  // original_invoice_id: true,
  // 	instruction_note: true,
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
    registration_name: z.string().min(1, "Client Name is required."),
    party_identification_scheme: z.literal("NAT"),
    party_identification_value: z.string().min(1, "National ID is required."),
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

export const SimplifiedTaxInvoiceSchema =
  BaseSimplifiedTaxInvoiceSchema.and(InvoiceTypeSchema).and(TaxCategorySchema);

export const CreateSimplifiedTaxInvoiceSchema =
  BaseSimplifiedTaxInvoiceSchema.omit({ id: true })
    .and(InvoiceTypeSchema)
    .and(TaxCategorySchema);

export type TSimplifiedTaxInvoiceDTO = z.infer<
  typeof SimplifiedTaxInvoiceSchema
>;
export type TCreateSimplifiedTaxInvoiceDTO = z.infer<
  typeof CreateSimplifiedTaxInvoiceSchema
>;
