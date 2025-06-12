import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddRolePage() {
  const navigate = useNavigate();
  const employerData = localStorage.getItem("employer");
  const employerId = employerData ? JSON.parse(employerData).employerId : null;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!employerId)
    return (
      <p className="p-4 text-red-600">Employer ID missing, please login.</p>
    );

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post(`/employers/${employerId}/roles`, formData);
      navigate(`/employers/${employerId}/roles`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Add New Role
      </h2>

      {error && (
        <p className="mb-4 text-red-600 bg-red-100 p-3 rounded">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Role Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Description (optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          {loading ? "Adding..." : "Add Role"}
        </button>
      </form>
    </div>
  );
}
