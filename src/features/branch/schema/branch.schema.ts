import {
  optionalString,
  requiredString,
} from "@/shared/schema/validation.schema";
import z from "zod";

export enum TaxIntegrationStatus {
  COMPLETED = "COMPLETED",
  NOT_STARTED = "NOT_STARTED",
  PENDING_OTP = "PENDING_OTP",
}

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
  tax_integration_status: z.enum([
    TaxIntegrationStatus.COMPLETED,
    TaxIntegrationStatus.NOT_STARTED,
    TaxIntegrationStatus.PENDING_OTP,
  ]),
});

export const CreateBranchSchema = BranchSchema.omit({
  id: true,
  tax_integration_status: true,
});

export const UpdateBranchSchema = CreateBranchSchema;

export type TBranchDTO = z.infer<typeof BranchSchema>;
export type TCreateBranchDTO = z.infer<typeof CreateBranchSchema>;
export type TUpdateBranchDTO = z.infer<typeof UpdateBranchSchema>;
