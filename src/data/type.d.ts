import { z } from "zod";
import {
  BodyTypeSchema,
  CarMakeSchema,
  CarSchema,
  EngineCapacitySchema,
  TransmissionModelSchema,
} from "./schema";

export type TransmissionModel = z.infer<typeof TransmissionModelSchema>;
export type EngineCapacity = z.infer<typeof EngineCapacitySchema>;
export type BodyType = z.infer<typeof BodyTypeSchema>;
export type CarMake = Omit<z.infer<typeof CarMakeSchema>, "logo"> & {
  logo: string;
};
export type Car = z.infer<typeof CarSchema>;
