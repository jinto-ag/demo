import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="mx-auto flex items-center  py-6 shadow w-full">
      <div className="container flex items-center gap-4">
        <div>
          <h5 className="text-2xl font-bold">EUNIGOS</h5>
        </div>
        <div className="flex gap-2">
          <NavLink to={`/`} className={"has-[.active]:font-bold"}>
            Home
          </NavLink>{" "}
          /<NavLink to={`car-makes/create`}>Add a new make</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
