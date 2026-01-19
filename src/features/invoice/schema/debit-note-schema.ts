import { z } from "zod";
import { invoiceSchema } from "./invoice.schema";

export const DebitNoteSchema = invoiceSchema(false).pick({
  id: true,
  supplier_id: true,
  invoice_type_code: true,
  issue_date: true,
  invoice_number: true,
  document_currency_code: true,
  discount_amount: true,
  actual_delivery_date: true,
  payment_means_code: true,
  original_invoice_id: true,
  note: true,
  invoice_lines: true,
  prices_include_tax: true,
  tax_authority_status: true,
});

export const CreateDebitNoteSchema = DebitNoteSchema.omit({
  id: true,
  tax_authority_status: true,
});

export type TCreateDebitNoteDTO = z.infer<typeof CreateDebitNoteSchema>;
