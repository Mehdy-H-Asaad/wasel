import { z } from "zod";

export const companyInfoSchema = z.object({
	registraion_name: z.string().min(1),
	vat_number: z.string().min(1),
	invoicing_type: z.string().min(1),
	address: z.string().min(1),
	business_category: z.string().min(1),
	street: z.string().min(1),
	building_number: z.string().min(1),
	division: z.string().min(1),
	city: z.string().min(1),
	postal_code: z.string().min(1),
	party_identification_scheme: z.string().min(1),
	party_identification_value: z.string().min(1),
	phone: z.string().min(1),
});
