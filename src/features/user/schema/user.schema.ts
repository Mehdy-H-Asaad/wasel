import z from "zod";
import { USER_ROLES } from "../constants/user.constants";
import { BranchSchema } from "@/features/branch/schema/branch.schema";

export enum USER_STATUS {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DISABLED = "DISABLED",
  DELETED = "DELETED",
}

export const UserSchema = z.object({
  name: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  id: z.number(),
  branch: BranchSchema,
  branch_id: z.number(),
  organization: z
    .object({
      id: z.number(),
      name: z.string().min(1, "Required"),
    })
    .nullable(),
  is_completed: z.boolean(),
  status: z.enum([
    USER_STATUS.PENDING,
    USER_STATUS.ACTIVE,
    USER_STATUS.BLOCKED,
    USER_STATUS.DISABLED,
    USER_STATUS.DELETED,
  ]),
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
  branch_id: true,
  email: true,
  phone: true,
  role: true,
});

export type TInviteUserDTO = z.infer<typeof InviteUserSchema>;
