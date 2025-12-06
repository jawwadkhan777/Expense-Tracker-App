import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-4 bg-white shadow-md py-4 px-7 backdrop-blur-[2px] sticky top-0 z-30">
      <button className="block lg:hidden text-black" onClick={() => setOpenSideMenu(!openSideMenu)}>
        {openSideMenu ? (
          <HiOutlineX size={25} className="text-2xl" onClick={() => setOpenSideMenu(false)} />
        ) : (
          <HiOutlineMenu size={25} className="text-2xl" onClick={() => setOpenSideMenu(true)} />
        )}
      </button>

      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] left-0 w-[250px] h-full bg-white shadow-md z-40 animate-slide-in">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
