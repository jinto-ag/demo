import { BodyType, Car, EngineCapacity, TransmissionModel } from "./type";

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

export const cars: Car[] = [
  {
    make: {
      id: 1,
      name: "Toyota",
      logo: new File([""], "logo.png"),
    },
    modelName: "Corolla",
    modelYear: 2020,
    transmissionModel: transmissionModelsSeed[0],
    engineCapacity: engineCapacitiesSeed[0],
    bodyType: bodyTypesSeed[0],
    isActive: true,
  },
  {
    make: {
      id: 2,
      name: "Honda",
      logo: new File([""], "logo.png"),
    },
    modelName: "Civic",
    modelYear: 2021,
    transmissionModel: transmissionModelsSeed[1],
    engineCapacity: engineCapacitiesSeed[1],
    bodyType: bodyTypesSeed[1],
    isActive: true,
  },
  {
    make: {
      id: 3,
      name: "Ford",
      logo: new File([""], "logo.png"),
    },
    modelName: "Mustang",
    modelYear: 2022,
    transmissionModel: transmissionModelsSeed[0],
    engineCapacity: engineCapacitiesSeed[0],
    bodyType: bodyTypesSeed[2],
    isActive: true,
  },
];
