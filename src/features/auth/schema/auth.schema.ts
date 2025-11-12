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
	name: z
		.string()
		.min(1, "Required")
		.max(100, "Maximum 100 characters allowed. Please shorten your text"),
	phone: z
		.string()
		.max(100, "Maximum 100 characters allowed. Please shorten your text")
		.optional(),
	code: z.string().min(6, "Required"),
});

export const SignupSchema = authSchema.pick({
	email: true,
	password: true,
	confirm_password: true,
	name: true,
	phone: true,
});

export const LoginSchema = authSchema.pick({
	email: true,
	password: true,
});

export const OtpSchema = authSchema.pick({
	code: true,
	email: true,
});

export type TSignupDTO = z.infer<typeof SignupSchema>;
export type TLoginDTO = z.infer<typeof LoginSchema>;
export type TOtpDTO = z.infer<typeof OtpSchema>;
