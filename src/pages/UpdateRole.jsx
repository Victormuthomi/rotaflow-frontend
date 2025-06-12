import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios"; // Your axios instance

export default function UpdateRole() {
  const { employerId, id } = useParams(); // :employerId and :id from route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing role data
  useEffect(() => {
    async function fetchRole() {
      try {
        const res = await api.get(`/employers/${employerId}/roles/${id}`);
        setFormData({
          name: res.data.name || "",
          description: res.data.description || "",
        });
      } catch (err) {
        setError("Failed to fetch role data.");
      } finally {
        setLoading(false);
      }
    }
    fetchRole();
  }, [employerId, id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/employers/${employerId}/roles/${id}`, formData);
      navigate(`/employers/${employerId}/roles`);
    } catch (err) {
      alert("Failed to update role.");
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Edit Role
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
            Role Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate(`/employers/${employerId}/roles`)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Update Role
          </button>
        </div>
      </form>
    </div>
  );
}
