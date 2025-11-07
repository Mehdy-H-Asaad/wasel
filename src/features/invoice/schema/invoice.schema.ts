import { requiredString } from "@/shared/schema/validation.schema";
import { z } from "zod";
import {
  InvoiceLinesSchema,
  TBaseTaxInvoiceLineDTO,
} from "./invoice-lines.schema";
import { TAX_RATE, NO_TAX_RATE } from "../constants/invoice.constants";
import { TClientDTO } from "@/features/clients/schema/client.schema";
import { TSupplierDTO } from "@/features/suppliers/schema/supplier.schema";

export const invoiceSchema = (isSaleInvoice: boolean) =>
  z.object({
    id: z.number(),
    customer_id: z.number().min(1, "Required"),
    invoice_type: z.enum(["0100000", "0200000"]),
    invoice_type_code: z.enum(["388", "383", "381", "386"]),
    issue_date: requiredString(50),
    supplier_id: z.number().min(1, "Required"),
    document_type: requiredString(50),
    discount_amount: z.number().optional(),
    issue_time: requiredString(50),
    document_currency_code: requiredString(50),
    note: z.string().max(200).nullable().optional(),
    invoice_number: requiredString(50),
    actual_delivery_date: requiredString(50),
    payment_means_code: requiredString(50),
    original_invoice_id: z.string().max(50).optional(),
    instruction_note: z.string().max(50).optional(),
    tax_rate: z.union([z.literal(TAX_RATE), z.literal(NO_TAX_RATE)]),
    tax_exemption_reason_code: z.string().max(50).optional(),
    tax_exemption_reason: z.string().max(50).optional(),
    invoice_lines: z
      .array(InvoiceLinesSchema(isSaleInvoice))
      .min(1, "Required"),
    registration_name: z.string().max(50).optional(),
    line_extension_amount: z.number().min(1, "Required"),
    tax_amount: z.number().min(1, "Required"),
    tax_inclusive_amount: z.number().min(1, "Required"),
    taxable_amount: z.number().min(1, "Required"),
    party_identification_scheme: z.string().max(50).optional(),
    party_identification_value: z.string().max(50).optional(),
    prices_include_tax: z.boolean(),
  });

export type TInvoiceDTO = Omit<
  z.infer<ReturnType<typeof invoiceSchema>>,
  "customer" | "invoice_lines" | "supplier"
> & {
  customer: TClientDTO;
  invoice_lines: TBaseTaxInvoiceLineDTO[];
  supplier: TSupplierDTO;
};
