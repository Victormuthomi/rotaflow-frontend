import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const employer = JSON.parse(localStorage.getItem("employer"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employer");
    navigate("/login");
  };

  const linkClass = (path) =>
    `hover:text-blue-600 ${
      location.pathname === path
        ? "text-blue-600 font-semibold"
        : "text-gray-700 dark:text-white"
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to={isLoggedIn ? "/dashboard" : "/"}
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          RotaFlow
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className={linkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link to="/employees" className={linkClass("/employees")}>
                Employees
              </Link>
              <Link to="/roles" className={linkClass("/roles")}>
                Roles
              </Link>
              <Link
                to={`/employers/${employer?.employerId}/schedule`}
                className={linkClass(
                  `/employers/${employer?.employerId}/schedule`,
                )}
              >
                Schedule
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline flex items-center gap-1"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className={linkClass("/")}>
                Home
              </Link>
              <Link to="/login" className={linkClass("/login")}>
                Login
              </Link>
              <Link to="/register" className={linkClass("/register")}>
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 dark:text-white focus:outline-none"
            aria-label="Toggle menu"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="block text-gray-700 dark:text-white hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                to="/employees"
                className="block text-gray-700 dark:text-white hover:text-blue-600"
              >
                Employees
              </Link>
              <Link
                to="/roles"
                className="block text-gray-700 dark:text-white hover:text-blue-600"
              >
                Roles
              </Link>
              <Link
                to={`/employers/${employer?.employerId}/schedule`}
                className="block text-gray-700 dark:text-white hover:text-blue-600"
              >
                Schedule
              </Link>
              <button
                onClick={handleLogout}
                className="block text-red-500 hover:underline"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="block text-gray-700 dark:text-white hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="block text-gray-700 dark:text-white hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-gray-700 dark:text-white hover:text-blue-600"
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
