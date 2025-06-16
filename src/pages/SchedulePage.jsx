import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import api from "../api/axios";

export default function SchedulePage() {
  const employerData = localStorage.getItem("employer");
  const employerId = employerData ? JSON.parse(employerData).employerId : null;

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!employerId) return;

    async function fetchSchedules() {
      try {
        const res = await api.get(`/employers/${employerId}/schedules`);
        setSchedules(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }

    fetchSchedules();
  }, [employerId]);

  async function generateSchedule() {
    try {
      setLoading(true);
      await api.post(`/employers/${employerId}/generate-schedule`);
      const res = await api.get(`/employers/${employerId}/schedules`);
      setSchedules(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  const handlePrint = () => {
    window.print();
  };

  if (!employerId)
    return <p className="p-4 text-red-600">Please login again.</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Schedules
          </h1>
          <div className="space-x-3 print:hidden">
            <button
              onClick={generateSchedule}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              {loading ? (
                <ImSpinner9 className="animate-spin text-white text-lg" />
              ) : (
                "Generate Schedule"
              )}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              🖨️ Print
            </button>
          </div>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {schedules.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">
            No schedules found. Click "Generate Schedule" to create one.
          </p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <th className="border px-4 py-2 text-left">Employee</th>
                  <th className="border px-4 py-2 text-left">Role</th>
                  <th className="border px-4 py-2 text-left">Day</th>
                  <th className="border px-4 py-2 text-left">Shift</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100"
                  >
                    <td className="border px-4 py-2">
                      {item.employee?.name || "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {item.role?.name || "-"}
                    </td>
                    <td className="border px-4 py-2">{item.day || "-"}</td>
                    <td className="border px-4 py-2">{item.shift || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Print styles */}
        <style>
          {`
            @media print {
              @page {
                size: A4 landscape;
                margin: 1cm;
              }
              body {
                -webkit-print-color-adjust: exact;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}
