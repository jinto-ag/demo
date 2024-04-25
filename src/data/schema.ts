import { z } from "zod";

export const TransmissionModelSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "Transmission Model name must be 3 characters long"),
});

export const EngineCapacitySchema = z.object({
  id: z.number().optional(),
  capacity: z.number(),
  unit: z.string().min(1, "Unit must be 1 characters long"),
});

export const BodyTypeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "Body Type name must be 3 characters long"),
});

export const CarMakeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "Make name must be 3 characters long"),
  logo: z.instanceof(File),
});

export const CarSchema = z.object({
  id: z.number().optional(),
  make: CarMakeSchema,
  modelName: z.string(),
  modelYear: z.number(),
  transmissionModel: TransmissionModelSchema,
  engineCapacity: EngineCapacitySchema,
  bodyType: BodyTypeSchema,
  isActive: z.boolean(),
});
