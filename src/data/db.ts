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
      engineCapacities: "++id, capacity",
      bodyTypes: "++id, name",
      carMakes: "++id, name",
      cars: "++id, make, modelName",
    });

    this.on("populate", () => {
      db.transmissionModels.bulkAdd(transmissionModelsSeed);
      db.engineCapacities.bulkAdd(engineCapacitiesSeed);
      db.bodyTypes.bulkAdd(bodyTypesSeed);
      db.cars.bulkAdd(cars);
    });
  }
}

export const db = new DataRepository();
