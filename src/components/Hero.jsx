function Hero() {
  return (
    <section className="bg-blue-50 text-center py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Rotaflow
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Efficient weekly employee scheduling with smart automation and clean
          reporting.
        </p>
        <a
          href="/register"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}

export default Hero;
