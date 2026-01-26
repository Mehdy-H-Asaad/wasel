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

export const BranchTaxAuthoritySchema = z.object({
  tax_authority: z.enum(["ZATCA_PHASE2"]),
  country_code: z.enum(["SA", "AE"]),
  registration_name: z.string().min(1, "Required"),
  common_name: z.string().min(1, "Required"),
  organization_unit_name: z.string().min(1, "Required"),
  organization_name: z.string().min(1, "Required"),
  vat_number: z
    .string()
    .min(15, "Required (15 digits)")
    .max(15, "Required (15 digits)"),
  invoicing_type: z.string().min(1, "Required"),
  address: z
    .string()
    .min(1, "Required")
    .min(10, "Address must be at least 10 characters"),
  business_category: z.string().min(1, "Required"),
  street: z.string().min(1, "Required"),
  building_number: z.string().min(1, "Required"),
  division: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  postal_code: z
    .string()
    .min(1, "Required")
    .min(5, "Postal code must be 5 digits"),
  party_identification_scheme: z.string().min(1, "Required"),
  party_identification_value: z.string().min(1, "Required"),
  stage: z.enum(["PRODUCTION", "COMPLIANCE"]),
  otp: z.string().min(6, "Required"),
});

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
  tax_authority_data: BranchTaxAuthoritySchema,
});

export const CreateBranchSchema = BranchSchema.omit({
  id: true,
  tax_authority_data: true,
  tax_integration_status: true,
});

export const CreateBranchTaxAuthoritySchema = BranchTaxAuthoritySchema.omit({
  otp: true,
});

export const CompleteBranchTaxAuthoritySchema = BranchTaxAuthoritySchema.pick({
  otp: true,
  tax_authority: true,
});

export const UpdateBranchSchema = CreateBranchSchema;

export type TBranchDTO = z.infer<typeof BranchSchema>;
export type TCreateBranchDTO = z.infer<typeof CreateBranchSchema>;
export type TUpdateBranchDTO = z.infer<typeof UpdateBranchSchema>;
export type TCreateBranchTaxAuthorityDTO = z.infer<
  typeof CreateBranchTaxAuthoritySchema
>;
export type TCompleteBranchTaxAuthorityDTO = z.infer<
  typeof CompleteBranchTaxAuthoritySchema
>;
