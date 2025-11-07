import { z } from "zod";

export const SupplierSchema = z.object({
  registration_name: z.string().min(1, "Required"),
  vat_number: z.string().optional(),
  street: z.string().optional(),
  building_number: z.string().optional(),
  division: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  party_identification_scheme: z.string().optional(),
  party_identification_value: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  bank_account: z.string().optional(),
  notes: z.string().nullable().optional(),
  id: z.number(),
});

export const CreateSupplierSchema = SupplierSchema.omit({
  id: true,
});

export const UpdateSupplierSchema = SupplierSchema;

export type TSupplierDTO = z.infer<typeof SupplierSchema>;

export type TCreateSupplierDTO = z.infer<typeof CreateSupplierSchema>;
export type TUpdateSupplierDTO = z.infer<typeof UpdateSupplierSchema>;
