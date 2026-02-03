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
    <form onSubmit={submit} className="min-h-screen grid place-items-center">
      <div className="w-80 space-y-3">
        <input className="border p-2 w-full" placeholder="Name" onChange={e=>setName(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="border p-2 w-full" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button className="bg-black text-white p-2 w-full">Register</button>
      </div>
    </form>
  );
}
