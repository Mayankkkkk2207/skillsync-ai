import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("applied");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then(res => {
        setCompany(res.data.company);
        setRole(res.data.role);
        setStatus(res.data.status);
        setNotes(res.data.notes || "");
      })
      .catch(() => {
        alert("Job not found");
        navigate("/dashboard");
      });
  }, [id, navigate]);

  const submit = async (e) => {
    e.preventDefault();

    await api.put(`/jobs/${id}`, {
      company,
      role,
      status,
      notes,
    });

    navigate("/dashboard");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this job?")) return;

    await api.delete(`/jobs/${id}`);
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={submit}
      className="min-h-screen grid place-items-center px-4 py-8"
    >
      <div className="w-full max-w-md space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold">Edit Job</h2>

        <input
          className="border border-slate-600 bg-slate-900 text-slate-200 p-2.5 sm:p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeholder="Company"
        />

        <input
          className="border border-slate-600 bg-slate-900 text-slate-200 p-2.5 sm:p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={role}
          onChange={e => setRole(e.target.value)}
          placeholder="Role"
        />

        <select
          className="border border-slate-600 bg-slate-900 text-slate-200 p-2.5 sm:p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <textarea
          className="border border-slate-600 bg-slate-900 text-slate-200 p-2.5 sm:p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Notes"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 px-4 py-2 sm:px-3 sm:py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500/10 text-sm font-medium transition"
          >
            Update Job
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 sm:px-3 sm:py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500/10 text-sm font-medium transition"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  );
}
