import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import api from "../api/axios";

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    setDeletingId(id);
    try {
      await api.delete(`/employees/${id}`, {
        headers: {
          "x-employer-id": employerId,
        },
      });
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete employee",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <ImSpinner9 className="animate-spin text-blue-600 text-4xl" />
      </div>
    );
  }

  if (error) {
    return <p className="p-4 text-red-600">Error: {error}</p>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen print:p-2 print:bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Employees
        </h2>
        <div className="space-x-3">
          <button
            onClick={() => navigate(`/employers/${employerId}/employees/add`)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded print:hidden"
          >
            + Add Employee
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded print:hidden"
          >
            🖨️ Print
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded shadow border border-gray-300 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 print:text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">No.</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">National ID</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-center print:hidden">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center p-4 text-gray-500 dark:text-gray-400"
                >
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map(
                ({ id, name, nationalId, phoneNumber, email, role }, index) => (
                  <tr
                    key={id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{name}</td>
                    <td className="px-4 py-2">{nationalId}</td>
                    <td className="px-4 py-2">{phoneNumber || "-"}</td>
                    <td className="px-4 py-2">{email || "-"}</td>
                    <td className="px-4 py-2">{role?.name || "-"}</td>
                    <td className="px-4 py-2 text-center space-x-3 print:hidden">
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
                        disabled={deletingId === id}
                        className={`text-red-600 hover:text-red-800 font-semibold ${
                          deletingId === id
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        {deletingId === id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ),
              )
            )}
          </tbody>
        </table>
      </div>

      <style>
        {`
          @media print {
            @page {
              size: A4 landscape;
              margin: 1cm;
            }
            body {
              -webkit-print-color-adjust: exact;
            }
          }
        `}
      </style>
    </div>
  );
}
