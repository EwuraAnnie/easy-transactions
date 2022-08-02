import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-white shadow-lg">
      <nav className="flex justify-between items-center max-w-7xl py-3 mx-auto">
        <h3 className="text-2xl">E-Transact</h3>
        <ul className="flex gap-10">
          <li>
            <Link to="/">All Transactions</Link>
          </li>
          <li>
            <Link to="/add-transaction">Add Transactions</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
