import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({});
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (search) params.append("search", search);

    const res = await api.get(`/jobs?${params.toString()}`);
    setJobs(res.data.data);
  };

  const fetchStats = async () => {
    const res = await api.get("/jobs/stats");
    setStats(res.data);
  };

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, [status, search]);

  const deleteJob = async (id) => {
    if (!confirm("Delete this job?")) return;
    await api.delete(`/jobs/${id}`);
    fetchJobs();
    fetchStats();
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-200">
      <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:p-6">

        {/* 🔢 STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: "Applied", value: stats.applied, color: "text-blue-400" },
            { label: "Interview", value: stats.interview, color: "text-yellow-400" },
            { label: "Offer", value: stats.offer, color: "text-green-400" },
            { label: "Rejected", value: stats.rejected, color: "text-red-400" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5"
            >
              <p className="text-xs sm:text-sm text-slate-400">{item.label}</p>
              <p className={`text-2xl sm:text-3xl font-bold ${item.color}`}>
                {item.value ?? 0}
              </p>
            </div>
          ))}
        </div>

        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">My Jobs</h1>
          <Link
            to="/add-job"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition text-center font-medium w-full sm:w-auto"
          >
            + Add Job
          </Link>
        </div>

        {/* FILTERS */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <input
            className="bg-transparent border border-slate-700 rounded-lg p-2 flex-1 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Search by company or role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="bg-transparent border border-slate-700 rounded-lg p-2"
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

        {/* JOB LIST */}
        {jobs.length === 0 ? (
          <p className="text-slate-400">No jobs found.</p>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start hover:border-blue-500 transition"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold truncate">{job.role}</h3>
                  <p className="text-sm text-slate-400 truncate">{job.company}</p>
                  <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-slate-800 capitalize">
                    {job.status}
                  </span>
                </div>

                <div className="flex gap-4 shrink-0">
                  <Link
                    to={`/edit-job/${job._id}`}
                    className="text-blue-400 hover:text-blue-300 text-sm py-1"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="text-red-400 hover:text-red-300 text-sm py-1"
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
    </div>
  );
}
