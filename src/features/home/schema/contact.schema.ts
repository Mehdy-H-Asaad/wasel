import { z } from "zod";

export const contactSchema = z.object({
	name: z
		.string()
		.min(1, "Required")
		.max(100, "Maximum 100 characters allowed. Please shorten your text."),
	email: z
		.string()
		.email("Invalid Email")
		.min(1, "Required")
		.max(100, "Maximum 100 characters allowed. Please shorten your text."),
	subject: z
		.string()
		.max(100, "Maximum 100 characters allowed. Please shorten your text.")
		.optional(),
	message: z
		.string()
		.min(1, "Required")
		.max(500, "Maximum 100 characters allowed. Please shorten your text."),
});
