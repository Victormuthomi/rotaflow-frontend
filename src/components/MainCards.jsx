import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaUserTag, FaCalendarAlt } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import api from "../api/axios";

export default function Dashboard() {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [rolesCount, setRolesCount] = useState(0);
  const [schedulesCount, setSchedulesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const employer = JSON.parse(localStorage.getItem("employer") || "{}");
  const employerId = employer?.employerId;

  useEffect(() => {
    if (!employerId) return;

    Promise.all([
      api.get(`/employers/${employerId}/employees`),
      api.get(`/employers/${employerId}/roles`),
      api.get(`/employers/${employerId}/schedules`),
    ])
      .then(([employeesRes, rolesRes, schedulesRes]) => {
        setEmployeesCount(employeesRes.data?.length || 0);
        setRolesCount(rolesRes.data?.length || 0);
        setSchedulesCount(schedulesRes.data?.length || 0);
      })
      .catch(() => {
        setEmployeesCount(0);
        setRolesCount(0);
        setSchedulesCount(0);
      })
      .finally(() => setLoading(false));
  }, [employerId]);

  const cardBase =
    "flex items-center p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer hover:shadow-lg transition";

  const data = [
    { name: "Employees", value: employeesCount },
    { name: "Roles", value: rolesCount },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 ml-8">
        Dashboard Overview
      </h2>

      {loading ? (
        <div className="text-center text-gray-600 dark:text-gray-300">
          Loading...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Employees Card */}
            <div className={cardBase} onClick={() => navigate("/employees")}>
              <FaUsers className="text-blue-600 dark:text-blue-400 text-3xl mr-4" />
              <div>
                <p className="text-gray-500 dark:text-gray-300">
                  Total Employees
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {employeesCount}
                </p>
              </div>
            </div>

            {/* Roles Card */}
            <div className={cardBase} onClick={() => navigate("/roles")}>
              <FaUserTag className="text-green-600 dark:text-green-400 text-3xl mr-4" />
              <div>
                <p className="text-gray-500 dark:text-gray-300">Total Roles</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {rolesCount}
                </p>
              </div>
            </div>

            {/* Schedules Card */}
            <div className={cardBase} onClick={() => navigate("/schedules")}>
              <FaCalendarAlt className="text-purple-600 dark:text-purple-400 text-3xl mr-4" />
              <div>
                <p className="text-gray-500 dark:text-gray-300">
                  Total Schedules
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {schedulesCount}
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Graph */}
          <div className="mt-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Employees vs Roles
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
