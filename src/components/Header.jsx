// src/components/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = true; // Replace with real login logic later

  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">RotaFlow</Link>
        </h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-300">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-300">
                Dashboard
              </Link>
              <button className="hover:text-blue-300">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-300">
              Login
            </Link>
          )}
        </nav>

        {/* Hamburger button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4">
          <Link to="/" className="block py-2 border-b">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="block py-2 border-b">
                Dashboard
              </Link>
              <button className="block py-2">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block py-2">
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
