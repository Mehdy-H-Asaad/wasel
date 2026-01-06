import { requiredString } from "@/shared/schema/validation.schema";
import { z } from "zod";

export const clientSchema = z.object({
  registration_name: requiredString(100),
  vat_number: requiredString(100).min(15, "Must be 15 digits long"),
  street: requiredString(100),
  building_number: requiredString(100).min(4, "Must be 4 digits long"),
  division: requiredString(100),
  city: requiredString(100),
  postal_code: requiredString(100).min(5, "Must be 5 digits long"),
  party_identification_scheme: requiredString(100),
  party_identification_value: requiredString(100),
  phone: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),
  notes: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),
  bank_account: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),
  id: z.number(),
  // email: z.string().email("Invalid email"),
});

export const CreateClientSchema = clientSchema.omit({
  id: true,
});

export const UpdateClientSchema = CreateClientSchema;

export type TClientDTO = z.infer<typeof clientSchema>;
export type TCreateClientDTO = z.infer<typeof CreateClientSchema>;
export type TUpdateClientDTO = z.infer<typeof UpdateClientSchema>;
