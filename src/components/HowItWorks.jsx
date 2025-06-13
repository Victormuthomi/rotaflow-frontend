// src/components/HowItWorks.jsx
import { FaUserPlus, FaClipboardList, FaClock } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaUserPlus size={30} className="text-blue-600" />,
      title: "Register & Login",
      description:
        "Create your account and securely log in to manage your team and schedules.",
    },
    {
      icon: <FaClipboardList size={30} className="text-blue-600" />,
      title: "Add Employees & Roles",
      description:
        "Easily add employees, assign roles, and organize your workforce effectively.",
    },
    {
      icon: <FaClock size={30} className="text-blue-600" />,
      title: "Generate Schedules",
      description:
        "Let Rotaflow automate your weekly schedules while you focus on productivity.",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-12 text-center">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 hover:shadow-md transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
