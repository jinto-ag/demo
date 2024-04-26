import { Form, redirect, type ActionFunctionArgs } from "react-router-dom";
import { Button } from "../../components/shadcn-ui/button";
import { db } from "../../data/db";

export async function action({ request, params }: ActionFunctionArgs) {
  console.log({ params });

  if (params.id) {
    await db.cars.delete(Number.parseInt(params.id));
  }
  return redirect("/car-makes/create");
}

const CarsDeleteRoute = () => {
  return (
    <div>
      <Form method="POST">
        <div className="flex gap-4">
          <h5 className="text-h5">Are you sure want to delete?</h5>
          <Button
            type="submit"
            variant={"destructive"}
            className="inline-flex gap-2 items-center"
          >
            Yes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CarsDeleteRoute;
