import React from "react";
import { Car } from "../data/type";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import { IconPencil, IconTrash } from "@tabler/icons-react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  car: Car;
}

const CarModelItem = ({ car, className, ...props }: Props) => {
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
            src={car.make.logo.name}
            alt={`${car.make.name} Logo`}
            className="object-cover object-center h-full w-full"
          />
        </div>
        <div className="flex flex-col">
          <h5 className="text-h6">{car.modelName}</h5>
          <p className="flex gap-2 text-gray-400">
            <span>{car.transmissionModel.name}</span>-
            <span>{car.bodyType.name}</span>-<span>{car.modelYear}</span>
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Link to={`/cars/${car.id}/delete`}>
          <button className="bg-red-400 p-2 rounded-md hover:bg-red-500">
            <IconTrash />
          </button>
        </Link>
        <Link to={`/cars/${car.id}/edit`}>
          <button className="bg-green-400 p-2 rounded-md hover:bg-green-500">
            <IconPencil />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarModelItem;
