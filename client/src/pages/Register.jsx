import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200">
        <div className="w-full max-w-md bg-slate-950/80 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-xl">
    
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-slate-400 mb-6">
            Start tracking your job applications
          </p>
    
          <form onSubmit={submit} className="space-y-4">
            <input
              className="w-full bg-transparent border border-slate-700 rounded-lg p-3 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
    
            <input
              className="w-full bg-transparent border border-slate-700 rounded-lg p-3 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
    
            <input
              className="w-full bg-transparent border border-slate-700 rounded-lg p-3 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
    
            <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold">
              Register
            </button>
          </form>
    
          <p className="text-sm text-slate-400 mt-6 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    );
}
