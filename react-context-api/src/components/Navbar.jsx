import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="Navbar">
      <div>
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/projects"> Projects </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;