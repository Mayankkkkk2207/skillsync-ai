import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-job"
        element={
          <ProtectedRoute>
            <AddJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-job/:id"
        element={
          <ProtectedRoute>
            <EditJob />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
