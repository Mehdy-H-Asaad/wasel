import { z } from "zod";
import { invoiceSchema } from "./invoice.schema";
// import { NO_TAX_RATE, TAX_RATE } from "../constants/invoice.constants";

export const simplifiedSaleTaxInvoiceSchema = invoiceSchema(true)
  .pick({
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
  })
  .extend({
    customer_id: z.number().optional(),
  });

export const CreateSimplifiedSaleTaxInvoiceSchema =
  simplifiedSaleTaxInvoiceSchema.omit({ id: true, tax_authority_status: true });

export const UpdateSimplifiedSaleInvoiceSchema =
  simplifiedSaleTaxInvoiceSchema.omit({ id: true, tax_authority_status: true });

export type TCreateSimplifiedSaleTaxInvoiceDTO = z.infer<
  typeof CreateSimplifiedSaleTaxInvoiceSchema
>;

export type TUpdateSimplifiedSaleInvoiceDTO = z.infer<
  typeof UpdateSimplifiedSaleInvoiceSchema
>;

export type TSimplifiedSaleTaxInvoiceDTO = z.infer<
  typeof simplifiedSaleTaxInvoiceSchema
>;
