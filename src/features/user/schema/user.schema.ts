import z from "zod";
import { USER_ROLES } from "../constants/user.constants";

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
	role: z.enum([
		USER_ROLES.SUPER_ADMIN,
		USER_ROLES.ADMIN,
		USER_ROLES.SALESMAN,
		USER_ROLES.ACCOUNTANT,
	]),
	type: z.string().min(1, "Required"),
	last_login: z.string().nullable(),
});
export type TUserDTO = z.infer<typeof UserSchema>;

export const InviteUserSchema = UserSchema.pick({
	name: true,
	email: true,
	phone: true,
	role: true,
});

export type TInviteUserDTO = z.infer<typeof InviteUserSchema>;
