import {
  optionalString,
  requiredString,
} from "@/shared/schema/validation.schema";
import z from "zod";

export enum BranchStatus {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
  DELETED = "DELETED",
}

export const BranchSchema = z.object({
  id: z.number(),
  name: requiredString(100),
  phone: requiredString(100),
  street: optionalString(100),
  building_number: optionalString(100),
  division: optionalString(100),
  city: optionalString(100),
  postal_code: optionalString(100),
  address: optionalString(100),
  status: z.enum([
    BranchStatus.COMPLETED,
    BranchStatus.PENDING,
    BranchStatus.DELETED,
  ]),
});

export const CreateBranchSchema = BranchSchema.omit({ id: true });

export type TBranchDTO = z.infer<typeof BranchSchema>;
export type TCreateBranchDTO = z.infer<typeof CreateBranchSchema>;
