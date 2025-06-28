'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { PhoneCall } from "lucide-react";

import FL from "./FL.jsx"; // Your logo component

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({});
  const timeoutRef = useRef(null);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSubMenu = (index) => {
    setExpandedMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  
  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Factory Licence",
      subNav: [
        { name: "Delhi", path: "/factory-licence-in-delhi" },
        { name: "Haryana", path: "/factory-licence-in-haryana" },
        { name: "Uttar Pradesh", path: "/factory-licence-in-uttar-pradesh" },
      ],
    },

    {
      name: "Pollution NOC",
      subNav: [
        { name: "Delhi", path: "/pollution-noc-in-delhi" },
        { name: "Haryana", path: "/pollution-noc-in-haryana" },
        { name: "Uttar Pradesh", path: "/pollution-noc-in-uttar-pradesh" },
      ],
    },


    {
      name: "Fire NOC",
      subNav: [
        { name: "Delhi", path: "/fire-noc-in-delhi" },
        { name: "Haryana", path: "/fire-noc-in-haryana" },
        { name: "Uttar Pradesh", path: "/fire-noc-in-uttar-pradesh" },
      ],
    },

    // {
    //   name: "Pollution NOC",
    //   subNav: [
    //     { name: "Delhi", path: "https://delhi.pollutionnoc.factorylicence.in" },
    //     {
    //       name: "Haryana",
    //       path: "https://haryana.pollutionnoc.factorylicence.in",
    //     },
    //     {
    //       name: "Uttar Pradesh",
    //       path: "https://uttarpradesh.pollutionnoc.factorylicence.in",
    //     },
    //   ],
    // },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Payments", path: "/payments" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 h-20 transition-all duration-300 ${isScrolled ? "bg-white shadow" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-4 md:px-6">
        <Link href="/" aria-label="Factory Licence Home">
          <div><FL /></div>
        </Link>

        {/* Desktop Nav */}
        {/* <div className="hidden md:flex gap-6 text-sm font-medium">
          {navItems.map((item, i) => (
            <div
              key={i}
              className="relative group"
              onMouseEnter={() => {
                clearTimeout(timeoutRef.current);
                setActiveDropdown(i);
              }}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
              }}
            >
              <Link
                href={item.path || "#"}
                className={`flex items-center gap-1 transition hover:text-purple-600 ${
                  pathname === item.path ? "text-purple-600" : "text-gray-800"
                }`}
              >
                {item.name}
                {item.subNav && <FiChevronDown size={14} />}
              </Link>

              {item.subNav && activeDropdown === i && (
                <div className="absolute left-0 mt-2 z-50 bg-white border rounded-md shadow-md">
                  {item.subNav.map((subItem, j) => (
                    <Link
                      key={j}
                      href={subItem.path}
                      className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div> */}

        {/* Desktop Button */}
        <div className=" items-center gap-3 text-black font-semibold">
          <button className="border border-gray-400 px-4 py-2 rounded-full text-xs md:text-sm flex items-center gap-2 hover:bg-gray-100 text-black font-semibold transition">
            <PhoneCall size={18} />
            +91 99107 74687
          </button>
        </div>

        {/* Mobile Toggle */}
        {/* <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu" className=" text-black font-semibold">
            {isOpen ? <FiX size={26} /> : <FiMenu size={26}  className="text-black"/>}
          </button>
        </div> */}
      </div>

      {/* Mobile Backdrop */}
      {/* {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={toggleMenu}
        />
      )} */}

      {/* Mobile Menu */}
      {/* <div
        className={`fixed top-0 left-0 z-50 bg-white w-4/5 max-w-sm h-full shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5">
          <Link href="/" onClick={toggleMenu}>
            <div className="text-xl font-bold text-purple-700">Factory Licence</div>
          </Link>
          <button onClick={toggleMenu} aria-label="Close menu">
            <FiX size={28} className="text-black" />
          </button>
        </div>

        <nav className="flex flex-col gap-5 px-6 pt-4 text-gray-800 text-base">
          {navItems.map((item, i) => (
            <div key={i} className="flex flex-col">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => item.subNav ? toggleSubMenu(i) : toggleMenu()}
              >
                <Link
                  href={item.path || "#"}
                  onClick={!item.subNav ? toggleMenu : undefined}
                  className="hover:text-purple-600"
                >
                  {item.name}
                </Link>
                {item.subNav && (
                  <FiChevronDown className={`transition-transform ${expandedMenus[i] ? "rotate-180" : ""}`} />
                )}
              </div>

              {item.subNav && expandedMenus[i] && (
                <div className="pl-4 mt-2 flex flex-col gap-2 text-sm text-gray-700">
                  {item.subNav.map((subItem, j) => (
                    <Link
                      key={j}
                      href={subItem.path}
                      onClick={toggleMenu}
                      className="hover:text-purple-600"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            className="mt-6 flex items-center gap-2 border border-black px-4 py-2 text-black font-semibold rounded-full text-black"
            aria-label="Call us"
          >
            <PhoneCall size={20} />
            +91 99107 74687
          </button>
        </nav>
      </div> */}
    </nav>
  );
};

export default Nav;
