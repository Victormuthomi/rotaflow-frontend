// src/components/Topbar.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Topbar() {
  const [employer, setEmployer] = useState(null);

  const employerData = JSON.parse(localStorage.getItem("employer") || "{}");
  const employerId = employerData?.employerId;

  useEffect(() => {
    if (!employerId) return;

    api
      .get(`/employers/${employerId}`)
      .then((res) => setEmployer(res.data))
      .catch((err) => {
        console.error("Failed to fetch employer details", err);
      });
  }, [employerId]);

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-blue-600 dark:text-white">
        {employer ? `👋 Hello, ${employer.name}` : "Loading..."}
      </h1>

      <div className="text-gray-600 dark:text-gray-300 text-sm hidden md:block">
        {employer?.email && <span>{employer.email}</span>}
      </div>
    </header>
  );
}
