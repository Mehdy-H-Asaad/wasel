import { requiredString } from "@/shared/schema/validation.schema";
import z from "zod";

export const PointOfSaleSchema = z.object({
  id: z.number(),
  name: requiredString(100),
});

export const CreatePointOfSaleSchema = PointOfSaleSchema.omit({
  id: true,
});

export const UpdatePointOfSaleSchema = CreatePointOfSaleSchema;

export type TPointOfSaleDTO = z.infer<typeof PointOfSaleSchema>;
export type TCreatePointOfSaleDTO = z.infer<typeof CreatePointOfSaleSchema>;
export type TUpdatePointOfSaleDTO = z.infer<typeof UpdatePointOfSaleSchema>;
