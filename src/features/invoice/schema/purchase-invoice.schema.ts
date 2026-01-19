import { z } from "zod";
import { invoiceSchema } from "./invoice.schema";

export const purchaseInvoiceSchema = invoiceSchema(false).pick({
  id: true,
  supplier_id: true,
  invoice_type_code: true,
  issue_date: true,
  invoice_number: true,
  document_currency_code: true,
  discount_amount: true,
  actual_delivery_date: true,
  payment_means_code: true,
  note: true,
  invoice_lines: true,
  prices_include_tax: true,
  tax_authority_status: true,
});

export const CreatePurchaseInvoiceSchema = purchaseInvoiceSchema.omit({
  id: true,
  tax_authority_status: true,
});

export const UpdatePurchaseInvoiceSchema = purchaseInvoiceSchema.omit({
  id: true,
  tax_authority_status: true,
});

export type TCreatePurchaseInvoiceDTO = z.infer<
  typeof CreatePurchaseInvoiceSchema
>;

export type TUpdatePurchaseInvoiceDTO = z.infer<
  typeof UpdatePurchaseInvoiceSchema
>;

export type TPurchaseInvoiceDTO = z.infer<typeof purchaseInvoiceSchema>;
