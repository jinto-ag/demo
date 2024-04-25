import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import { Car } from "./type";

const useAllCars = () => {
  return useLiveQuery(() => db.cars.toArray());
};

const useCarById = (id: number) => {
  return useLiveQuery(() => db.cars.get(id));
};

const useFilteredCars = (field: keyof Car, value: string | number) => {
  return useLiveQuery(() => db.cars.where(field).equals(value).toArray());
};

export const useCar = () => {
  return { useAllCars, useCarById, useFilteredCars };
};
