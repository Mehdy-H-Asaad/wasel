import { z } from "zod";

export const requiredString = (max = 100) =>
	z.string().min(1, "Required").max(max);
export const requiredShortCode = (length: number) =>
	z
		.string()
		.min(1, "Required")
		.length(length, `Must be exactly ${length} characters`);
