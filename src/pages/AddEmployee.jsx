import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddEmployeePage() {
  const navigate = useNavigate();
  const employerData = localStorage.getItem("employer");
  const employerId = employerData ? JSON.parse(employerData).employerId : null;

  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    roleId: "",
  });

  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState(null);

  useEffect(() => {
    if (!employerId) return;

    async function fetchRoles() {
      try {
        setRolesLoading(true);
        const res = await api.get(`/employers/${employerId}/roles`);
        setRoles(res.data);
      } catch (err) {
        setRolesError(
          err.response?.data?.message || err.message || "Failed to load roles.",
        );
      } finally {
        setRolesLoading(false);
      }
    }

    fetchRoles();
  }, [employerId]);

  if (!employerId) {
    return (
      <p className="p-4 text-red-600">
        Employer ID not found. Please login again.
      </p>
    );
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post(`/employers/${employerId}/employees`, formData);
      navigate(`/employees`);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to add employee.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Add New Employee
        </h1>

        {error && (
          <p className="mb-4 text-red-600 bg-red-100 p-3 rounded">{error}</p>
        )}
        {rolesError && (
          <p className="mb-4 text-red-600 bg-red-100 p-3 rounded">
            {rolesError}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 dark:bg-gray-800 shadow-md rounded p-6 space-y-4"
        >
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="e.g. Jane Doe"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              National ID
            </label>
            <input
              type="text"
              name="nationalId"
              required
              value={formData.nationalId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="e.g. 0712345678"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="e.g. jane@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Role
            </label>
            {rolesLoading ? (
              <p className="text-sm text-gray-500">Loading roles...</p>
            ) : (
              <select
                name="roleId"
                value={formData.roleId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              >
                <option value="">-- Select a role --</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || rolesLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}
