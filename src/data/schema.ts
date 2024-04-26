import { z } from "zod";
import { db } from "./db";

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
  logo: z.instanceof(File, { message: "Select a valid image" }),
});

export const CarSchema = z.object({
  id: z.number().optional(),
  makeId: z.coerce.number().refine(async (id) => {
    const make = await db.carMakes.get(id);
    if (!make) {
      throw new Error("Select a valid Car Make");
    }
    return make.id;
  }),
  modelName: z.string(),
  modelYear: z.number(),
  transmissionModelId: z.coerce.number().refine(async (id) => {
    const result = await db.transmissionModels.get(id);
    if (!result) {
      throw new Error("Select a valid Transmission Model");
    }
    return result.id;
  }),
  engineCapacityId: z.coerce.number().refine(async (id) => {
    const result = await db.engineCapacities.get(id);
    if (!result) {
      throw new Error("Select a valid Engine Capacity");
    }
    return result.id;
  }),
  bodyTypeId: z.coerce.number().refine(async (id) => {
    const result = await db.bodyTypes.get(id);
    if (!result) {
      throw new Error("Select a valid Body Type");
    }
    return result.id;
  }),
  isActive: z.boolean().optional(),
});
