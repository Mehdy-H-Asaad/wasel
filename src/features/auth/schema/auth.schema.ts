import { z } from "zod";

export const authSchema = z.object({
	email: z
		.string()
		.min(1, "Required")
		.max(100, "Maximum 100 characters allowed. Please shorten your text")
		.email("Invalid email address"),
	password: z
		.string()
		.min(1, "Required")
		.max(100, "Maximum 100 characters allowed. Please shorten your text"),
	confirm_password: z
		.string()
		.min(1, "Required")
		.max(100, "Maximum 100 characters allowed. Please shorten your text"),
});
