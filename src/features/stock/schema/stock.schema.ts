import { z } from "zod";

export const stockSchema = z.object({
	id: z.string(),
	name: z.string().min(1, "Rqeuired").max(100, "Only 100 characters allowed"),
	default_sale_price: z
		.number({
			required_error: "Required, must be a number",
			invalid_type_error: "Required, must be a number",
		})
		.positive()
		.min(1, "Required"),
	default_buy_price: z
		.number({
			required_error: "Required, must be a number",
			invalid_type_error: "Required, must be a number",
		})
		.positive()
		.min(1, "Required"),
	unit_code: z.string().min(1, "Required"),
	description: z.string().optional(),
});

export const CreateStockSchema = stockSchema.omit({ id: true });
export const UpdateStockSchema = stockSchema.omit({ id: true });

export type TStockDTO = z.infer<typeof stockSchema>;
export type TCreateStockDTO = z.infer<typeof CreateStockSchema>;
export type TUpdateStockDTO = z.infer<typeof UpdateStockSchema>;
