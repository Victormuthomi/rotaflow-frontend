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
      setRoles(roles.filter((role) => role.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  }

  if (!employerId)
    return <p className="p-4 text-red-600">Please login again.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Roles
      </h1>

      <Link
        to={`/employers/${employerId}/roles/add`}
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add New Role
      </Link>

      {loading ? (
        <p>Loading roles...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : roles.length === 0 ? (
        <p>No roles found. Add some!</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Description</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr
                key={role.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="border px-4 py-2">{role.name}</td>
                <td className="border px-4 py-2">{role.description || "-"}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/employers/${employerId}/roles/edit/${role.id}`)
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
    </div>
  );
}
