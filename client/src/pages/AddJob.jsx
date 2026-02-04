import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md space-y-4 border p-6 rounded"
      >
        <h2 className="text-xl font-bold">Add Job</h2>

        <input
          className="border p-2 w-full"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <input
          className="border p-2 w-full"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <select
          className="border p-2 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <textarea
          className="border p-2 w-full"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button className="bg-black text-white p-2 w-full">
          Add Job
        </button>
      </form>
    </div>
  );
}
