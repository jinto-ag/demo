import React, { useEffect } from "react";
import {
  BodyType,
  Car,
  CarMake,
  EngineCapacity,
  TransmissionModel,
} from "../data/type";
import { twMerge } from "tailwind-merge";
import { Form, Link } from "react-router-dom";
import { IconPencil, IconTrash } from "@tabler/icons-react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  car: Car & {
    make: CarMake | undefined;
    bodyType: BodyType | undefined;
    transmissionModel: TransmissionModel | undefined;
    engineCapacity: EngineCapacity | undefined;
  };
}

const CarModelItem = ({ car, className, ...props }: Props) => {
  useEffect(() => {}, [car.id]);

  return (
    <div
      {...props}
      className={twMerge(
        "flex items-center justify-between gap-2 p-3 rounded-xl border hover:shadow",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex rounded-lg overflow-hidden h-16 w-16 bg-gray-300 items-center justify-center">
          <img
            src={car.make?.logo}
            alt={`${car.make?.name} Logo`}
            className="object-cover object-center h-full w-full"
          />
        </div>
        <div className="flex flex-col">
          <h5 className="text-h6">{car.modelName}</h5>
          <p className="flex gap-2 text-gray-400">
            <span>{car.transmissionModel?.name}</span>-
            <span>{car.bodyType?.name}</span>-<span>{car.modelYear}</span>
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Form action={`/car-makes/${car.makeId}/cars/${car.id}/delete`} method="POST">
          <button
            type="submit"
            className="bg-red-400 p-2 rounded-md hover:bg-red-500"
          >
            <IconTrash />
          </button>
        </Form>

        <Link to={`/car-makes/${car.makeId}/cars/${car.id}/edit`}>
          <button className="bg-green-400 p-2 rounded-md hover:bg-green-500">
            <IconPencil />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarModelItem;
