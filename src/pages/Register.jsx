import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    organizationName: "",
    departmentName: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await api.post("/employers/register", {
        name: form.name,
        nationalId: form.nationalId,
        phoneNumber: form.phoneNumber,
        email: form.email,
        organizationName: form.organizationName,
        departmentName: form.departmentName,
        password: form.password,
      });

      setSuccess("✅ Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">
          Register as Employer
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-3">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm text-center mb-3">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "name", placeholder: "Full Name" },
            { name: "nationalId", placeholder: "National ID" },
            { name: "phoneNumber", placeholder: "Phone Number" },
            { name: "email", placeholder: "Email Address", type: "email" },
            { name: "organizationName", placeholder: "Organization Name" },
            { name: "departmentName", placeholder: "Department Name" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type || "text"}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}

          {/* Password field with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2 right-3 text-gray-600 dark:text-gray-400"
              tabIndex={-1}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          {/* Confirm Password field with toggle */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-2 right-3 text-gray-600 dark:text-gray-400"
              tabIndex={-1}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
