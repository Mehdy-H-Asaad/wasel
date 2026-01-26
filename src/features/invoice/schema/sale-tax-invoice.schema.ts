import { z } from "zod";
import { EINVOICE_STATUS, invoiceSchema } from "./invoice.schema";
// import { NO_TAX_RATE, TAX_RATE } from "../constants/invoice.constants";

export const saleTaxInvoiceSchema = invoiceSchema(true).pick({
  id: true,
  customer_id: true,
  invoice_type: true,
  invoice_type_code: true,
  issue_date: true,
  issue_time: true,
  document_currency_code: true,
  document_type: true,
  discount_amount: true,
  actual_delivery_date: true,
  payment_means_code: true,
  note: true,
  invoice_lines: true,
  prices_include_tax: true,
  status: true,
  tax_authority_status: true,
  project_id: true,
  point_of_sale_id: true,
});

export const CreateSaleTaxInvoiceSchema = saleTaxInvoiceSchema.omit({
  id: true,
  tax_authority_status: true,
});

export const UpdateSaleInvoiceSchema = saleTaxInvoiceSchema.omit({
  id: true,
  tax_authority_status: true,
});

export const UpdateSaleInvoiceStatusSchema = z.object({
  status: z.enum([EINVOICE_STATUS.DRAFT,EINVOICE_STATUS.ISSUED]),
  send_to_tax_authority: z.boolean(),
});
export type TCreateSaleTaxInvoiceDTO = z.infer<
  typeof CreateSaleTaxInvoiceSchema
>;
export type TUpdateSaleInvoiceDTO = z.infer<typeof UpdateSaleInvoiceSchema>;
export type TSaleTaxInvoiceDTO = z.infer<typeof saleTaxInvoiceSchema>;
export type TUpdateSaleInvoiceStatusDTO = z.infer<typeof UpdateSaleInvoiceStatusSchema>;