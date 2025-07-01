'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

 import { PhoneCall } from "lucide-react";

import FL from "./FL.jsx"; // Your logo component

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({});
  const timeoutRef = useRef(null);
  const pathname = usePathname();

 
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

        

        {/* Desktop Button */}
        <div className=" items-center gap-3 text-black font-semibold">
          <a href="tel:+919910774687" className="border border-gray-400 px-4 py-2 rounded-full text-xs md:text-sm flex items-center gap-2 hover:bg-gray-100 text-black font-semibold transition">
  <PhoneCall size={18} />
Talk To Expert
</a>

        </div>

        
      </div>
 
    </nav>
  );
};

export default Nav;
