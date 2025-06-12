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
    roleId: "", // store role ID here
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
      // Send roleId instead of role name
      await api.post(`/employers/${employerId}/employees`, formData);
      navigate(`/employers/${employerId}/employees`);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to add employee.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Add New Employee
      </h2>

      {error && (
        <p className="mb-4 text-red-600 bg-red-100 p-3 rounded">{error}</p>
      )}

      {rolesError && (
        <p className="mb-4 text-red-600 bg-red-100 p-3 rounded">{rolesError}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            National ID
          </label>
          <input
            type="text"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Role
          </label>
          {rolesLoading ? (
            <p>Loading roles...</p>
          ) : (
            <select
              name="roleId"
              value={formData.roleId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="" disabled>
                Select a role
              </option>
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}
