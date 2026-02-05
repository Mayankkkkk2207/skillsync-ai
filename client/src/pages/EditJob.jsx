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

  return (
    <form
      onSubmit={submit}
      className="min-h-screen grid place-items-center"
    >
      <div className="w-96 space-y-3">
        <h2 className="text-xl font-bold">Edit Job</h2>

        <input
          className="border p-2 w-full"
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeholder="Company"
        />

        <input
          className="border p-2 w-full"
          value={role}
          onChange={e => setRole(e.target.value)}
          placeholder="Role"
        />

        <select
          className="border p-2 w-full"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <textarea
          className="border p-2 w-full"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Notes"
        />

        <button className="bg-black text-white p-2 w-full">
          Update Job
        </button>
      </div>
    </form>
  );
}
