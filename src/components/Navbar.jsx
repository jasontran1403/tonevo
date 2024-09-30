import { useState } from "react";

import { close, menu } from "../assets";
import logo from "../assets/logo.png";
import { connectedNavLinks } from "../constants";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";

const Navbar = ({ handleOpenModal }) => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const connect = useTonConnectUI();

  const handleMenuItemClick = (title, index) => {
    setActive(title);
    handleOpenModal(true, index);
    if (toggle) setToggle(false); // Close the navbar modal
  };

  return (
    <nav className="w-full flex flex-1 justify-between items-center navbar gap-0 mt-[20px]">
      <a href="/">
        <img
          src={logo}
          alt="hoobank"
          className="hidden md:flex lg:w-[200px] lg:h-[80px] w-[160px] h-[60px] logo-glow"
        />
      </a>

      <ul className="list-none sm:flex hidden justify-center items-center flex-1 mx-10">
        {connectedNavLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === connectedNavLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => handleMenuItemClick(nav.title, index)} // Use the new handler
          >
            {nav.id === "dashboard" || nav.id === "mapchain-swap" ? (
              <a href={`/${nav.id}`}>{nav.title}</a>
            ) : (
              <a href={`#${nav.id}`}>{nav.title}</a>
            )}
          </li>
        ))}
      </ul>
      <TonConnectButton
        className="flex justify-end items-center lg:ml-10 mr-8" // Add margin-left for spacing
      />
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          style={{ zIndex: 9999 }}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {connectedNavLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === connectedNavLinks.length - 1 ? "mb-0" : "mb-4"}`} // Adjust the margin-bottom here
                onClick={() => handleMenuItemClick(nav.title, index)} // Use the new handler
              >
                {nav.id === "dashboard" || nav.id === "mapchain-swap" ? (
                  <a href={`/${nav.id}`}>{nav.title}</a>
                ) : (
                  <a href={`#${nav.id}`}>{nav.title}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
