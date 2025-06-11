#!/bin/bash

echo "🚀 Initializing Vite + React + Tailwind project..."

# Step 1: Initialize project with Vite + React
npm create vite@latest . --template react
echo "✅ Vite project created."

# Step 2: Install Tailwind CSS and setup
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Step 3: Configure Tailwind
cat > tailwind.config.js <<EOF
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
EOF

# Step 4: Tailwind directives in index.css
cat > src/index.css <<EOF
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# Step 5: Setup folders and files
echo "📁 Creating folders and files..."
mkdir -p src/components
mkdir -p src/pages
touch src/constants.js

# Pages
cat > src/pages/Home.jsx <<EOF
const Home = () => (
  <div className="p-6 text-center">
    <h1 className="text-3xl font-bold text-blue-600">Welcome to RotaFlow</h1>
    <p className="mt-4 text-gray-600">Modern scheduling made simple.</p>
  </div>
);
export default Home;
EOF

cat > src/pages/Dashboard.jsx <<EOF
const Dashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
    <p>Manage weekly employee schedules here.</p>
  </div>
);
export default Dashboard;
EOF

cat > src/pages/Print.jsx <<EOF
const Print = () => (
  <div className="p-6">
    <h2 className="text-xl font-medium">Print View</h2>
    <p>See and print your generated schedules.</p>
  </div>
);
export default Print;
EOF

# App.jsx with routing
cat > src/App.jsx <<EOF
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Print from "./pages/Print";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/print" element={<Print />} />
      </Routes>
    </Router>
  );
}

export default App;
EOF

# Constants file
echo 'export const WEEKS = [1, 2, 3, 4];' > src/constants.js

# .gitignore
cat > .gitignore <<EOF
node_modules/
dist/
.env
.DS_Store
.vite/
*.log
EOF

# Step 6: Install dependencies
npm install react-router-dom

# Step 7: Git init and commit
git init
git add .
git commit -m "Initial commit: Vite + React + Tailwind setup with structure"

echo "✅ All done! Run 'npm run dev' to start the dev server."

