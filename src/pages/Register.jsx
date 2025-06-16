import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";
import Spinner from "../components/Spinner";

const commonWeakPasswords = [
  "123456",
  "password",
  "123456789",
  "12345678",
  "qwerty",
  "abc123",
];

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const idRegex = /^[0-9]{7,8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!phoneRegex.test(form.phoneNumber)) {
      return "Phone number must be exactly 10 digits.";
    }

    if (!idRegex.test(form.nationalId)) {
      return "National ID must be 7 or 8 digits.";
    }

    if (!emailRegex.test(form.email)) {
      return "Invalid email address.";
    }

    if (commonWeakPasswords.includes(form.password)) {
      return "Password is too common. Please choose a stronger password.";
    }

    if (!strongPasswordRegex.test(form.password)) {
      return "Password must be at least 8 characters, include a letter, a number, and a special character.";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

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
    } finally {
      setLoading(false);
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
            disabled={loading}
          >
            {loading ? <Spinner size={20} /> : "Register"}
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
