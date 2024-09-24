import React from "react";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import DarkMode from "./DarkMode";
import LinksDropDown from "./LinksDropDown";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container flex flex-col flex-wrap gap-4 sm:flex-row sm:justify-between sm:items-center py-8">
        <Logo />
        <NavSearch />

        <div className="flex gap-4 items-center">
          <DarkMode />
          <LinksDropDown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
