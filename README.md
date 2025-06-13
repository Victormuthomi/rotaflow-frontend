# RotaFlow Frontend

This is the frontend for **RotaFlow**, a shift scheduling and workforce management system. It communicates with the backend REST API built using Node.js, Express, and PostgreSQL.

The frontend is built using **React**, **Vite**, and **Tailwind CSS** for a fast, responsive, and modern user experience.

---

## 🧰 Tech Stack

- **React** – Component-based UI
- **Vite** – Lightning-fast frontend tooling
- **Tailwind CSS** – Utility-first CSS framework
- **Axios** – HTTP requests to the backend API
- **React Router** – Routing and navigation
- **Context API / Redux (if applicable)** – State management

---

## 📦 Project Structure

```bash
rotaflow-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── context/         # Auth or global state
│   ├── hooks/
│   ├── services/        # Axios logic for API calls
│   └── App.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js

🚀 Getting Started
1. Clone the Repository

git clone git@github.com:Victormuthomi/rotaflow-frontend.git
cd rotaflow-frontend

2. Install Dependencies

npm install

3. Run the Development Server

npm run dev

Visit the app in your browser at:
📍 http://localhost:5173
🔌 API Configuration

In src/services/api.js (or wherever your Axios instance is), set the base URL:

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

If you use environment variables, create a .env:

VITE_API_URL=http://localhost:5000/api

Then access via:

import.meta.env.VITE_API_URL

🧠 Core Features

    Employer registration and login

    Manage employees

    Manage roles

    Auto-generate and view shift schedules

    Protected routes (requires login)

    Mobile responsive UI

🔗 Backend

RotaFlow backend is built with Node.js and Express.
📦 Repo: rotaflow-backend
🖌️ Tailwind CSS

Tailwind config is set up in tailwind.config.js.
To use custom colors or themes, you can extend the config like:

theme: {
  extend: {
    colors: {
      primary: '#1E40AF',
    }
  }
}

🔐 Auth (Optional Example)

If you use Context API or Redux for managing auth:

// context/AuthContext.jsx
const [isLoggedIn, setIsLoggedIn] = useState(false);

Use useEffect to check tokens, and use PrivateRoute components to guard protected routes.
📄 License

MIT License
🙌 Contributing

Pull requests are welcome! Open an issue or fork the repo and submit a PR.
```
