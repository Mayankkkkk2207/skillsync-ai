import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function AddJob() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("applied");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await api.post("/jobs", {
        company,
        role,
        status,
        notes,
      });

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add job");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200 px-4 py-8">
      <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Add New Job</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            className="w-full border border-slate-600 bg-slate-900 text-slate-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />

          <input
            className="w-full border border-slate-600 bg-slate-900 text-slate-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />

          <select
            className="w-full border border-slate-600 bg-slate-900 text-slate-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>

          <textarea
            className="w-full border border-slate-600 bg-slate-900 text-slate-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <Button type="submit" className="w-full py-3">
            Save Job
          </Button>
        </form>
      </div>
    </div>
  );
}
