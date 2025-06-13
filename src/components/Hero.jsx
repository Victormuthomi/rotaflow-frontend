// src/components/Hero.jsx
export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900 text-center py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
          Welcome to RotaFlow
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Automate weekly employee scheduling while keeping reports sleek and
          intuitive.
        </p>
        <a
          href="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
