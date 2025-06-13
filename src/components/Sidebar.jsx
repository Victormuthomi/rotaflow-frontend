// src/components/Sidebar.jsx
import { useState } from "react";
import {
  FaUser,
  FaBriefcase,
  FaCalendarAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const employer = JSON.parse(localStorage.getItem("employer") || "{}");
  const employerId = employer?.employerId;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employer");
    navigate("/login");
  };

  const navItems = [
    { name: "Employees", icon: <FaUser />, path: "/employees" },
    { name: "Roles", icon: <FaBriefcase />, path: "/roles" },
    {
      name: "Schedules",
      icon: <FaCalendarAlt />,
      path: `/employers/${employerId}/schedule`,
    },
    { name: "Profile", icon: <FaUserCircle />, path: "/profile" },
  ];

  return (
    <aside
      className={`bg-white dark:bg-gray-800 shadow-lg h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } fixed md:relative z-20 text-gray-800 dark:text-gray-200`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300 dark:border-gray-700">
        <h1
          className={`font-bold text-lg transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          Dashboard
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-xl"
        >
          <FaBars />
        </button>
      </div>

      <nav className="mt-6 space-y-2 px-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="text-xl">
            <FaSignOutAlt />
          </span>
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </nav>
    </aside>
  );
}
