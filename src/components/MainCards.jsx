// src/components/MainCards.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainCards() {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [rolesCount, setRolesCount] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  // Assuming employerId is known or fetched from somewhere; for now hardcoded:
  const employerId = 1;

  useEffect(() => {
    // Fetch total employees
    fetch(`/api/employees/employer/${employerId}`)
      .then((res) => res.json())
      .then((data) => setEmployeesCount(data.length || 0))
      .catch(() => setEmployeesCount(0));

    // Fetch total roles
    fetch(`/api/roles/employer/${employerId}`)
      .then((res) => res.json())
      .then((data) => setRolesCount(data.length || 0))
      .catch(() => setRolesCount(0));

    // Fetch schedules
    fetch(`/api/schedules/employer/${employerId}`)
      .then((res) => res.json())
      .then((data) => setSchedules(data || []))
      .catch(() => setSchedules([]));
  }, [employerId]);

  return (
    <div className="mt-20 px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Employees Card */}
      <div
        onClick={() => navigate("/employees")}
        className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Total Employees
        </h2>
        <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
          {employeesCount}
        </p>
      </div>

      {/* Roles Card */}
      <div
        onClick={() => navigate("/roles")}
        className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Total Roles
        </h2>
        <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
          {rolesCount}
        </p>
      </div>

      {/* Schedules Card */}
      <div
        onClick={() => navigate("/schedules")}
        className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Schedules
        </h2>
        <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
          {schedules.length} schedule{schedules.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
