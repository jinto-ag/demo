import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/navbar";
import { db } from "../data/db";

export async function loader() {
  const cars = await db.cars.toArray();
  const carMakes = await db.carMakes.toArray();
  return { cars, carMakes };
}

function Root() {
  const { cars, carMakes } = useLoaderData();

  return (
    <>
      <Navbar />
      <main className="md:p-16 flex flex-wrap gap-4 flex-auto">
        <Outlet />
      </main>
    </>
  );
}

export default Root;
