import { requiredString } from "@/shared/schema/validation.schema";
import { z } from "zod";

export const clientSchema = z.object({
	registration_name: requiredString(100),
	vat_number: requiredString(100),
	street: requiredString(100),
	building_number: requiredString(100),
	division: requiredString(100),
	city: requiredString(100),
	postal_code: requiredString(100),
	party_identification_scheme: requiredString(100),
	party_identification_value: requiredString(100),
	// email: z.string().email("Invalid email"),
});

export type TCreateClientDTO = z.infer<typeof clientSchema>;
