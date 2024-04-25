import { BodyType, EngineCapacity, TransmissionModel } from "./type";

export const transmissionModelsSeed: TransmissionModel[] = [
  { name: "Automatic" },
  { name: "Manual" },
];

export const engineCapacitiesSeed: EngineCapacity[] = [
  { capacity: 1.6, unit: "L" },
  { capacity: 2.0, unit: "L" },
];

export const bodyTypesSeed: BodyType[] = [
  { name: "Sedan" },
  { name: "SUV" },
  { name: "Compact SUV" },
  { name: "Hatch back" },
  { name: "Sedan" },
  { name: "Pickup" },
  { name: "Van" },
];
