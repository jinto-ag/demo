import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center gap-4 p-6 shadow w-full">
      <div>
        <h5 className="text-h5">EUNIGOS</h5>
      </div>
      <div className="flex gap-2">
        <NavLink to={`/`} className={"has-[.active]:font-bold"}>Home</NavLink> /
        <NavLink to={`car-makes/add`}>Add a new make</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
