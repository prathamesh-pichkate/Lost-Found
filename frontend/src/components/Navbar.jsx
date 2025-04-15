import React, { useState } from "react";
import { logo } from "../assets/images";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: "Home", href: "#", current: true },
    { name: "About", href: "#", current: false },
    { name: "Services", href: "#", current: false },
  ];

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src={logo} className="h-14" alt="L&F Logo" />
        </a>

        {/* Desktop Search Bar */}
        <div className="hidden md:block relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
        </div>

        {/* Mobile Menu & Search Toggle */}
        <div className="flex md:hidden gap-2">
          {/* Search Icon (mobile only) */}
          <button className="text-gray-500 p-2 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation Links + Search (mobile) */}
        <div
          className={`w-full md:flex md:items-center md:justify-between md:w-auto ${
            menuOpen ? "block mt-4" : "hidden"
          }`}
        >
          {/* Mobile Search */}
          <div className="md:hidden mb-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute mt-2 left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
          </div>

          {/* Nav Links */}
          <ul className="flex flex-col mr-4 md:flex-row md:space-x-6 font-normal text-gray-700 dark:text-gray-200">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`block py-2 px-3  text-sm rounded md:p-0 ${
                    link.current
                      ? "text-blue-700 dark:text-blue-400"
                      : "hover:text-blue-700 dark:hover:text-blue-400"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="mt-4 md:mt-0 space-x-2 lg:space-x-4">
            <button className="bg-blue-600 text-white text-sm px-2 py-1 lg:px-3 py-2 rounded-sm hover:bg-blue-700">
              Report
            </button>
            <button className="bg-blue-600 text-white text-sm px-2 py-1 lg:px-3 py-2 rounded-sm hover:bg-blue-700">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
