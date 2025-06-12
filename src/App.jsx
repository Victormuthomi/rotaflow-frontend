import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashboardLayout from "./pages/DashboardLayout";
import Print from "./pages/Print";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmployeesPage from "./pages/EmployeesPage";
import AddEmployee from "./pages/AddEmployee";
import RolesPage from "./pages/Roles";
import AddRolePage from "./pages/AddRolePage";
import EditEmployeePage from "./pages/EditEmployee";
import UpdateRole from "./pages/UpdateRole";
import SchedulePage from "./pages/SchedulePage";

function App() {
  return (
    <Router>
      {/* Global Navbar */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/print" element={<Print />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route
          path="/employers/:employerId/employees/add"
          element={<AddEmployee />}
        />
        <Route path="/roles" element={<RolesPage />} />
        <Route
          path="/employers/:employerId/roles/add"
          element={<AddRolePage />}
        />
        <Route
          path="/employers/:employerId/employees/:id/edit"
          element={<EditEmployeePage />}
        />
        <Route
          path="/employers/:employerId/roles/edit/:id"
          element={<UpdateRole />}
        />

        <Route
          path="/employers/:employerId/schedule"
          element={<SchedulePage />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
