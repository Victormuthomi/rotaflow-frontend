import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaUserTag, FaCalendarAlt } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
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

    const fetchData = async () => {
      try {
        const [employeesRes, rolesRes, schedulesRes] = await Promise.all([
          api.get(`/employers/${employerId}/employees`),
          api.get(`/employers/${employerId}/roles`),
          api.get(`/employers/${employerId}/schedules`),
        ]);

        setEmployeesCount(employeesRes.data?.length || 0);
        setRolesCount(rolesRes.data?.length || 0);
        setSchedulesCount(schedulesRes.data?.length || 0);
      } catch (err) {
        setEmployeesCount(0);
        setRolesCount(0);
        setSchedulesCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employerId]);

  const cardBase =
    "flex items-center p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer hover:shadow-lg transition";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <ImSpinner9 className="animate-spin text-blue-600 text-4xl" />
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
    </div>
  );
}
