import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function SchedulePage() {
  const { employerId } = useParams();
  const [restPerWeek, setRestPerWeek] = useState(2);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const generateSchedule = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await api.post(`/employers/${employerId}/schedule`, {
        restPerWeek,
      });

      const grouped = {};

      res.data.schedule.forEach((entry) => {
        const week = entry.week;
        const normalizedStatus = entry.status.trim().toLowerCase();

        if (!grouped[week]) {
          grouped[week] = { working: [], resting: [] };
        }

        if (normalizedStatus === "work") {
          grouped[week].working.push(entry);
        } else if (normalizedStatus === "rest") {
          grouped[week].resting.push(entry);
        }
      });

      setResult(grouped);
    } catch (err) {
      setError(err.response?.data?.message || "Error generating schedule");
    } finally {
      setLoading(false);
    }
  };

  const printSection = (sectionId, weekLabel) => {
    const content = document.getElementById(sectionId);
    const win = window.open("", "", "width=800,height=600");
    win.document.write("<html><head><title>Print</title>");
    win.document.write(`
      <style>
        body {
          font-family: sans-serif;
          padding: 20px;
          color: #000;
        }
        h2 {
          font-size: 20px;
          margin-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          margin-bottom: 30px;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f0f0f0;
        }
      </style>
    `);
    win.document.write("</head><body>");
    win.document.write(`<h2>${weekLabel}</h2>`);
    win.document.write(content.innerHTML);
    win.document.write("</body></html>");
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Monthly Employee Schedule
      </h1>

      <div className="mb-4 flex gap-4 items-center">
        <label className="text-gray-700 dark:text-gray-200 font-medium">
          Rest per week:
        </label>
        <input
          type="number"
          min="1"
          max="10"
          value={restPerWeek}
          onChange={(e) => setRestPerWeek(Number(e.target.value))}
          className="p-2 rounded border"
        />
        <button
          onClick={generateSchedule}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Schedule"}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {result && (
        <div className="mt-6 space-y-12">
          {Object.entries(result).map(([week, data]) => (
            <div
              key={week}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Week {week}
              </h2>

              {/* Working Table */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
                    Working Employees
                  </h3>
                  <button
                    onClick={() =>
                      printSection(
                        `week-${week}-working`,
                        `Week ${week} - Working Employees`,
                      )
                    }
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Print Working
                  </button>
                </div>
                <div id={`week-${week}-working`}>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                      <tr>
                        <th className="border px-4 py-2">No</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.working.map((item, index) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-800 dark:text-gray-100"
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">
                            {item.employeeName}
                          </td>
                          <td className="border px-4 py-2">
                            {item.employeeRole}
                          </td>
                          <td className="border px-4 py-2 capitalize">
                            {item.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Resting Table */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">
                    Resting Employees
                  </h3>
                  <button
                    onClick={() =>
                      printSection(
                        `week-${week}-resting`,
                        `Week ${week} - Resting Employees`,
                      )
                    }
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Print Resting
                  </button>
                </div>
                <div id={`week-${week}-resting`}>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                      <tr>
                        <th className="border px-4 py-2">No</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.resting.map((item, index) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-800 dark:text-gray-100"
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">
                            {item.employeeName}
                          </td>
                          <td className="border px-4 py-2">
                            {item.employeeRole}
                          </td>
                          <td className="border px-4 py-2 capitalize">
                            {item.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
