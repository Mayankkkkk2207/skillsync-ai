import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    const params = new URLSearchParams();

    if (status) params.append("status", status);
    if (search) params.append("search", search);

    const res = await api.get(`/jobs?${params.toString()}`);
    setJobs(res.data.data);
  };

  useEffect(() => {
    fetchJobs();
  }, [status, search]);

  const deleteJob = async (id) => {
    if (!confirm("Delete this job?")) return;
    await api.delete(`/jobs/${id}`);
    fetchJobs();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Jobs</h1>
        <Link to="/add-job" className="bg-black text-white px-4 py-2 rounded">
          + Add Job
        </Link>
      </div>

      {/* 🔍 Filters */}
      <div className="flex gap-4 mb-6">
        <input
          className="border p-2 flex-1"
          placeholder="Search by company or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{job.role}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
                <span className="text-xs capitalize">{job.status}</span>
              </div>

              <div className="space-x-3">
                <Link
                  to={`/edit-job/${job._id}`}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </Link>

                <button
                  className="text-red-600 text-sm"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
