import { Link, Outlet } from "react-router-dom";
import { removeToken } from "../utils/auth";

export default function Layout() {
  const logout = () => {
    removeToken();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 relative">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-950/70 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-400">SkillSync AI</h1>

        <div className="flex gap-6 items-center">
          <Link to="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
          <Link to="/add-job" className="hover:text-blue-400">
            Add Job
          </Link>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto p-6 relative animate-fadeIn">
        <div className="absolute inset-0 bg-linear-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

