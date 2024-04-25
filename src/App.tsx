import { useEffect, useState } from "react";
import "./App.css";
import CarModelItem from "./components/car-model-item";
import Navbar from "./components/navbar";
import NewMakeForm from "./components/new-make-form";
import { db } from "./data/db";
import { Car } from "./data/type";

function App() {
  const [carModels, setCarModels] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCarModels = async () => {
      const carModels = await db.cars.toArray();
      setCarModels(carModels);
    };

    fetchCarModels();
  }, []);

  return (
    <>
      <Navbar />
      <main className="container p-4 md:p-16 flex">
        <div className="flex flex-col gap-4 p-4  flex-auto">
          <NewMakeForm />
        </div>
        <div className="flex flex-col flex-auto">
          <h4 className="text-h4">Models</h4>
          <p>The models that you've already added under the make </p>
          <ul className="flex flex-col gap-4">
            {carModels.map((car) => (
              <li key={car.id} className="hover:shadow">
                <CarModelItem car={car} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
