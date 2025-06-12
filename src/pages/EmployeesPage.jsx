import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // your axios instance

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parse employer object from localStorage and extract employerId
  const employerData = localStorage.getItem("employer");
  const employerId = employerData ? JSON.parse(employerData).employerId : null;

  useEffect(() => {
    if (!employerId) {
      setError("Employer ID not found in local storage.");
      setLoading(false);
      return;
    }

    async function fetchEmployees() {
      try {
        setLoading(true);
        const res = await api.get(`/employers/${employerId}/employees`);
        setEmployees(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Error loading employees",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchEmployees();
  }, [employerId]);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      await api.delete(`/employers/${employerId}/employees/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete employee",
      );
    }
  }

  if (loading) return <p className="p-4 text-gray-600">Loading employees...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Employees
        </h2>
        <button
          onClick={() => navigate(`/employers/${employerId}/employees/add`)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          + Add Employee
        </button>
      </div>

      <div className="overflow-x-auto rounded shadow border border-gray-300 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                National ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-4 text-gray-500 dark:text-gray-400"
                >
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map(
                ({ id, name, nationalId, phoneNumber, email, role }) => (
                  <tr
                    key={id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {nationalId}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {phoneNumber || "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {email || "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {role?.name || "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-center space-x-3">
                      <button
                        onClick={() =>
                          navigate(
                            `/employers/${employerId}/employees/${id}/edit`,
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ),
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
