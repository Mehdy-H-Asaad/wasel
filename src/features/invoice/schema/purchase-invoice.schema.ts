import { z } from "zod";
import { invoiceSchema } from "./invoice.schema";

export const purchaseInvoiceSchema = invoiceSchema(false).pick({
  id: true,
  supplier_id: true,
  invoice_type: true,
  invoice_type_code: true,
  issue_date: true,
  invoice_number: true,
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

export const CreatePurchaseInvoiceSchema = purchaseInvoiceSchema.omit({
  id: true,
});
export type TCreatePurchaseInvoiceDTO = z.infer<
  typeof CreatePurchaseInvoiceSchema
>;
export type TPurchaseInvoiceDTO = z.infer<typeof purchaseInvoiceSchema>;
