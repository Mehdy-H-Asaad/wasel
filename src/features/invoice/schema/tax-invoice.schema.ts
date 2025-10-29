import { z } from "zod";
import { invoiceSchema } from "./invoice.schema";
// import { NO_TAX_RATE, TAX_RATE } from "../constants/invoice.constants";

export const taxInvoiceSchema = invoiceSchema.pick({
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
  // instruction_note: true,
  // original_invoice_id: true,
  // tax_rate: true,

  invoice_lines: true,
  prices_include_tax: true,
});

export const CreateTaxInvoiceSchema = taxInvoiceSchema.omit({ id: true });
export type TCreateTaxInvoiceDTO = z.infer<typeof CreateTaxInvoiceSchema>;
export type TTaxInvoiceDTO = z.infer<typeof taxInvoiceSchema>;
