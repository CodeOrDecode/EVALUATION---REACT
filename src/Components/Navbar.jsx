import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/create" style={{marginLeft:"30px"}}>Create Todos</Link>
    </div>
  );
};

export default Navbar;
