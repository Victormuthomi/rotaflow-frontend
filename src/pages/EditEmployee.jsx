import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios"; // your axios instance

export default function EditEmployeePage() {
  const navigate = useNavigate();
  const { employerId, id } = useParams();
  const [employeeData, setEmployeeData] = useState({
    name: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    roleId: "",
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [empRes, rolesRes] = await Promise.all([
          api.get(`/employers/${employerId}/employees/${id}`),
          api.get(`/employers/${employerId}/roles`),
        ]);
        setEmployeeData({
          name: empRes.data.name,
          nationalId: empRes.data.nationalId,
          phoneNumber: empRes.data.phoneNumber || "",
          email: empRes.data.email || "",
          roleId: empRes.data.role?.id || "",
        });
        setRoles(rolesRes.data);
      } catch (err) {
        setError("Failed to load employee or roles.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [employerId, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/employers/${employerId}/employees/${id}`, employeeData);
      navigate(`/employees`);
    } catch (err) {
      alert("Failed to update employee.");
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Edit Employee
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
              National ID
            </label>
            <input
              type="text"
              name="nationalId"
              value={employeeData.nationalId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
              Phone
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={employeeData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
              Role
            </label>
            <select
              name="roleId"
              value={employeeData.roleId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
              required
            >
              <option value="">-- Select Role --</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate(`/employers/${employerId}/employees`)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
