import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function RolesPage() {
  const navigate = useNavigate();
  const employerData = localStorage.getItem("employer");
  const employerId = employerData ? JSON.parse(employerData).employerId : null;

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!employerId) return;

    async function fetchRoles() {
      try {
        setLoading(true);
        const res = await api.get(`/employers/${employerId}/roles`);
        setRoles(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRoles();
  }, [employerId]);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      await api.delete(`/employers/${employerId}/roles/${id}`);
      setRoles((prev) => prev.filter((role) => role.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  }

  const handlePrint = () => {
    window.print();
  };

  if (!employerId)
    return <p className="p-4 text-red-600">Please login again.</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Roles
          </h1>
          <div className="space-x-3">
            <Link
              to={`/employers/${employerId}/roles/add`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
            >
              + Add Role
            </Link>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 print:hidden"
            >
              🖨️ Print
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-700 dark:text-gray-300">Loading roles...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : roles.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">
            No roles found. Add some!
          </p>
        ) : (
          <table className="w-full border-collapse print:text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                <th className="border px-4 py-2 text-left">No.</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-center print:hidden">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr
                  key={role.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100"
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{role.name}</td>
                  <td className="border px-4 py-2">
                    {role.description || "-"}
                  </td>
                  <td className="border px-4 py-2 text-center space-x-2 print:hidden">
                    <button
                      onClick={() =>
                        navigate(
                          `/employers/${employerId}/roles/edit/${role.id}`,
                        )
                      }
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(role.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Print styles */}
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
    </div>
  );
}
