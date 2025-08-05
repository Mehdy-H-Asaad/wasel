import { z } from "zod";

export const stockSchema = z.object({
	name: z.string().min(1, "Rqeuired").max(100, "Only 100 characters allowed"),
	price: z
		.number({
			required_error: "Required, must be a number",
			invalid_type_error: "Required, must be a number",
		})
		.positive()
		.min(1, "Required"),
});
