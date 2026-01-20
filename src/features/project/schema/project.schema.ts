import { requiredString } from "@/shared/schema/validation.schema";
import { clientSchema } from "@/features/clients/schema/client.schema";
import z from "zod";

export enum ProjectStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

const BaseProjectSchema = z.object({
  id: z.number(),
  name: requiredString(100),
  description: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),
  status: z.enum([
    ProjectStatus.DRAFT,
    ProjectStatus.ACTIVE,
    ProjectStatus.ON_HOLD,
    ProjectStatus.COMPLETED,
    ProjectStatus.CANCELLED,
  ]),
  start_date: z.string(),
  end_date: z.string().nullable().optional(),
  budget_amount: z.number().nullable().optional(),
  customer_id: z.number(),
});

export const ProjectSchema = BaseProjectSchema.omit({
  customer_id: true,
}).extend({
  customer: clientSchema,
});

export const CreateProjectSchema = BaseProjectSchema.omit({
  id: true,
});

export const UpdateProjectSchema = CreateProjectSchema;

export type TProjectDTO = z.infer<typeof ProjectSchema>;
export type TCreateProjectDTO = z.infer<typeof CreateProjectSchema>;
export type TUpdateProjectDTO = z.infer<typeof UpdateProjectSchema>;
