import Dexie, { Table } from "dexie";
import {
  BodyType,
  Car,
  CarMake,
  EngineCapacity,
  TransmissionModel,
} from "./type";
import {
  transmissionModelsSeed,
  engineCapacitiesSeed,
  bodyTypesSeed,
  cars,
  carMakes,
} from "./seed";

export class DataRepository extends Dexie {
  transmissionModels!: Table<TransmissionModel>;
  engineCapacities!: Table<EngineCapacity>;
  bodyTypes!: Table<BodyType>;
  carMakes!: Table<CarMake>;
  cars!: Table<Car>;

  constructor() {
    super("demo-db");
    this.version(1).stores({
      transmissionModels: "++id, name",
      engineCapacities: "++id, capacity, unit",
      bodyTypes: "++id, name",
      carMakes: "++id, name, logo",
      cars: "++id, makeId, bodyTypeId, engineCapacityId, transmissionModelId, modelName, modelYear, isActive",
    });

    this.on("populate", () => {
      db.transmissionModels.bulkAdd(transmissionModelsSeed);
      db.engineCapacities.bulkAdd(engineCapacitiesSeed);
      db.bodyTypes.bulkAdd(bodyTypesSeed);
      db.carMakes.bulkAdd(carMakes);
      db.cars.bulkAdd(cars);
    });
  }
}

export const db = new DataRepository();
