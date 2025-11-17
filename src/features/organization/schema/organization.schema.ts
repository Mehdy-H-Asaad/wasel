import { z } from "zod";

export const OrganizationSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  country_code: z.enum(["SA", "AE"]),
  vat_number: z
    .string()
    .min(15, "Required (15 digits)")
    .max(15, "Required (15 digits)"),
  business_category: z.string().min(1, "Required"),
  tax_scheme: z.enum(["ZATCA_PHASE1", "ZATCA_PHASE2", "UAE_TAX"]),
  phone: z.string().min(1, "Required"),
  street: z.string().min(1, "Required"),
  building_number: z.string().min(1, "Required"),
  division: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  postal_code: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
});

export const CreateOrganizationSchema = OrganizationSchema.omit({
  id: true,
});

export type TCreateOrganizationDTO = z.infer<typeof CreateOrganizationSchema>;
export type TOrganizationDTO = z.infer<typeof OrganizationSchema>;
