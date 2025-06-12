import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployeePage = () => {
  const { employerId, id } = useParams(); // employeeId is 'id' here
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch employee and roles on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const empRes = await axios.get(
          `/api/employers/${employerId}/employees`,
        );
        const found = empRes.data.find((e) => e.id === id);
        if (!found) {
          setMessage("Employee not found");
          return;
        }

        const roleRes = await axios.get(`/api/employers/${employerId}/roles`);

        setEmployee(found);
        setRoles(roleRes.data);
        setFormData({
          name: found.name || "",
          nationalId: found.nationalId || "",
          phoneNumber: found.phoneNumber || "",
          email: found.email || "",
          role: found.role?.name || "",
        });
      } catch (error) {
        console.error(error);
        setMessage("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employerId, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.put(`/api/employers/${employerId}/employees/${id}`, formData);
      setMessage("Employee updated successfully");
      setTimeout(() => navigate(-1), 1500); // Go back after success
    } catch (error) {
      console.error(error);
      setMessage("Failed to update employee");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>

      {message && <p className="mb-4 text-blue-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="nationalId"
          value={formData.nationalId}
          onChange={handleChange}
          placeholder="National ID"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployeePage;
