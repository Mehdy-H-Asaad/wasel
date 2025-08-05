import { z } from "zod";

export const otpSchema = z.object({
	code: z.string().min(6, "Required"),
	email: z.string().min(1, "Required").email("Invalid email"),
});

export type TOTPVerifcationDTO = z.infer<typeof otpSchema>;
