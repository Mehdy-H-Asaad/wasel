import z from "zod";

export const UserSchema = z.object({
	name: z.string().min(1, "Required"),
	phone: z.string().min(1, "Required"),
	email: z.string().email("Invalid email"),
	id: z.number(),
	organization: z
		.object({
			id: z.number(),
			name: z.string().min(1, "Required"),
		})
		.nullable(),
	is_completed: z.boolean(),
	status: z.string().min(1, "Required"),
	role: z.string().min(1, "Required"),
	type: z.string().min(1, "Required"),
	last_login: z.string().nullable(),
});
export type TUserDTO = z.infer<typeof UserSchema>;
