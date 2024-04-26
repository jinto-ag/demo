import {
  BodyType,
  Car,
  CarMake,
  EngineCapacity,
  TransmissionModel,
} from "./type";
import toyotaLogo from "../assets/logos/toyota-logo.png";

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

export const carMakes: CarMake[] = [
  {
    id: 1,
    name: "Toyota",
    logo: toyotaLogo,
  },
];

export const cars: Car[] = [
  {
    id: 1,
    makeId: 1,
    modelName: "Corolla",
    modelYear: 2020,
    transmissionModelId: 1,
    engineCapacityId: 1,
    bodyTypeId: 1,
    isActive: true,
  },
];
