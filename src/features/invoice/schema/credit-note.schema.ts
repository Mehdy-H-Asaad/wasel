import { z } from "zod";
import { invoiceSchema } from "./invoice.schema";

export const creditNoteSchema = invoiceSchema(true).pick({
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
  original_invoice_id: true,
  status: true,
  invoice_lines: true,
  prices_include_tax: true,
});

export const CreateCreditNoteSchema = creditNoteSchema.omit({
  id: true,
});

export type TCreateCreditNoteDTO = z.infer<typeof CreateCreditNoteSchema>;
export type TCreditNoteDTO = z.infer<typeof creditNoteSchema>;
