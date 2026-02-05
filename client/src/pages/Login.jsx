import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ STORE TOKEN CORRECTLY
      localStorage.setItem("token", res.data.token);

      // ✅ REDIRECT AFTER LOGIN
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="min-h-screen grid place-items-center"
    >
      <div className="w-80 space-y-3">
        <h1 className="text-xl font-bold text-center">Login</h1>

        <input
          className="border p-2 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-black text-white p-2 w-full"
        >
          Login
        </button>
      </div>
    </form>
  );
}
