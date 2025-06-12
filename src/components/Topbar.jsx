// src/components/Topbar.jsx
import { useEffect, useState } from "react";

export default function Topbar() {
  const [greeting, setGreeting] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Greeting logic based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Check system preference for dark mode
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);

    // Apply initial theme
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 shadow-md fixed w-full top-0 left-0 z-10">
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {greeting}, Victor
      </div>
      <button
        onClick={toggleDarkMode}
        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}
