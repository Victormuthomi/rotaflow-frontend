// src/components/FeatureCard.jsx
export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center">
      <div className="text-4xl text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
