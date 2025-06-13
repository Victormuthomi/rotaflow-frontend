import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // adjust path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employer");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          RotaFlow
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                to="/employees"
                className="text-gray-700 hover:text-blue-600"
              >
                Employees
              </Link>
              <Link to="/roles" className="text-gray-700 hover:text-blue-600">
                Roles
              </Link>
              <Link
                to={`/employers/${JSON.parse(localStorage.getItem("employer"))?.employerId}/schedule`}
                className="text-gray-700 hover:text-blue-600"
              >
                Schedule
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="block text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                to="/employees"
                className="block text-gray-700 hover:text-blue-600"
              >
                Employees
              </Link>
              <Link
                to="/roles"
                className="block text-gray-700 hover:text-blue-600"
              >
                Roles
              </Link>
              <Link
                to={`/employers/${JSON.parse(localStorage.getItem("employer"))?.employerId}/schedule`}
                className="block text-gray-700 hover:text-blue-600"
              >
                Schedule
              </Link>
              <button
                onClick={handleLogout}
                className="block text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="block text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link
                to="/login"
                className="block text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
