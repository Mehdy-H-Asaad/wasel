import { z } from "zod";

export const SupplierSchema = z.object({
	registration_name: z.string().min(1, "Required"),
	vat_number: z
		.string()
		.optional()
		.nullable()
		.transform(val => (val === "" ? null : val)),
	street: z
		.string()
		.optional()
		.nullable()
		.transform(val => (val === "" ? null : val)),
	building_number: z
		.string()
		.optional()
		.nullable()
		.transform(val => (val === "" ? null : val)),
	division: z
		.string()
		.optional()
		.nullable()
		.transform(val => (val === "" ? null : val)),
	city: z
		.string()
		.optional()
		.nullable()
		.transform(val => (val === "" ? null : val)),
	postal_code: z
		.string()
		.optional()
		.nullable()
		.transform(val => (val === "" ? null : val)),
	party_identification_scheme: z
		.string()
		.optional()
		.nullable()
		.transform(val => (val === "" ? null : val)),
	party_identification_value: z
		.string()
		.optional()
		.nullable()
		.transform(val => (val === "" ? null : val)),
	phone: z
		.string()
		.optional()
		.nullable()
		.transform(val => (val === "" ? null : val)),
	website: z
		.string()
		.optional()
		.nullable()
		.transform(val => (val === "" ? null : val)),
	bank_account: z
		.string()
		.optional()
		.nullable()
		.transform(val => (val === "" ? null : val)),
	notes: z
		.string()
		.nullable()
		.optional()
		.nullable()
		.transform(val => (val === "" ? null : val)),
	id: z.number(),
	email: z
		.string()
		.email("Invalid email")
		.nullable()
		.optional()
		.transform(val => (val === "" ? null : val)),
	whatsapp: z
		.string()
		.nullable()
		.optional()
		.transform(val => (val === "" ? null : val)),
});

export const CreateSupplierSchema = SupplierSchema.omit({
	id: true,
});

export const UpdateSupplierSchema = SupplierSchema.omit({
	id: true,
});

export type TSupplierDTO = z.infer<typeof SupplierSchema>;

export type TCreateSupplierDTO = z.infer<typeof CreateSupplierSchema>;
export type TUpdateSupplierDTO = z.infer<typeof UpdateSupplierSchema>;
