import { FaUsers, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import FeatureCard from "../components/FeaturedCard";

export default function Features() {
  const features = [
    {
      icon: <FaUsers />,
      title: "Team Management",
      description: "Add, update, or remove employees with ease.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Smart Scheduling",
      description: "Generate weekly schedules with intelligent automation.",
    },
    {
      icon: <FaChartLine />,
      title: "Performance Reports",
      description: "Visualize staff hours and efficiency with clean charts.",
    },
  ];

  return (
    <section className="bg-blue-50 dark:bg-gray-900 pt-16 pb-4 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-10 text-center">
          Why Choose RotaFlow?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
