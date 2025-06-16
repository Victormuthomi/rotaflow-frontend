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
      api
        .get(`/employers/${employerId}/employees`)
        .then((res) => setEmployeesCount(res.data?.length || 0))
        .catch(() => setEmployeesCount(0)),

      api
        .get(`/employers/${employerId}/roles`)
        .then((res) => setRolesCount(res.data?.length || 0))
        .catch(() => setRolesCount(0)),

      api
        .get(`/employers/${employerId}/schedules`)
        .then((res) => setSchedulesCount(res.data?.length || 0))
        .catch(() => setSchedulesCount(0)),
    ]).finally(() => setLoading(false));
  }, [employerId]);

  const cardBase =
    "flex items-center p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer hover:shadow-lg transition";

  const chartData = [
    { name: "Employees", value: employeesCount, fill: "#3B82F6" }, // Blue
    { name: "Roles", value: rolesCount, fill: "#10B981" }, // Green
    { name: "Schedules", value: schedulesCount, fill: "#8B5CF6" }, // Purple
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 ml-8">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Employees Card */}
        <div className={cardBase} onClick={() => navigate("/employees")}>
          <FaUsers className="text-blue-600 dark:text-blue-400 text-3xl mr-4" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Total Employees</p>
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
            <p className="text-gray-500 dark:text-gray-300">Total Schedules</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {schedulesCount}
            </p>
          </div>
        </div>
      </div>

      {/* Bar Chart Card */}
      <div className="mt-10 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Overview Comparison
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
