import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-md shadow-md rounded-full px-2 py-1 flex items-center justify-between w-[90px]"
      ref={menuRef}
    >
      <Link to="/" 
      onClick={() => setMenuOpen(!menuOpen)}
      className="font-bold text-gray-800">
        Menu
      </Link>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-gray-700 focus:outline-none"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {menuOpen && (
        <div className="absolute top-14 left-0 bg-white shadow-lg rounded-xl w-full py-2">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
          >
            Favorites
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
