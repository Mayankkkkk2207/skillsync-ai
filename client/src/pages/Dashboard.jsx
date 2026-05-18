import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import StatsCards from "../components/dashboard/StatsCards";
import TimelineChart from "../components/charts/TimelineChart";
import StatusPieChart from "../components/charts/StatusPieChart";
import RolePerformanceTable from "../components/dashboard/RolePerformanceTable";


export default function Dashboard() {

  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 5;

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (status) {
        params.append("status", status);
      }

      if (search) {
        params.append("search", search);
      }

      const res = await api.get(
        `/jobs?${params.toString()}`
      );

      setJobs(res.data.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch jobs", error);
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchJobs();

    // reset page when filters/search change
    setCurrentPage(1);

  }, [status, search]);

  // PAGINATION LOGIC
  const indexOfLastJob =
    currentPage * jobsPerPage;

  const indexOfFirstJob =
    indexOfLastJob - jobsPerPage;

  const currentJobs = jobs.slice(
    indexOfFirstJob,
    indexOfLastJob
  );

  const totalPages = Math.ceil(
    jobs.length / jobsPerPage
  );

  const deleteJob = async (id) => {

    if (!confirm("Delete this job?")) {
      return;
    }

    try {

      await api.delete(`/jobs/${id}`);
      toast.success("Job deleted successfully");

      fetchJobs();

    } catch (error) {
      toast.error("Failed to delete job", error);
    }
  };

  return (

    <div className="min-h-screen w-full bg-slate-900 text-slate-200">

      <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:p-6">

        {/* STATS */}
        <div className="mb-8">
          <StatsCards />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          <TimelineChart />

          <StatusPieChart />

        </div>

        {/* ROLE TABLE */}
        <div className="mb-8">
          <RolePerformanceTable />
        </div>

        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">

          <h1 className="text-2xl sm:text-3xl font-bold">
            My Jobs
          </h1>

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
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="bg-transparent border border-slate-700 rounded-lg p-2"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="">
              All
            </option>

            <option value="applied">
              Applied
            </option>

            <option value="interview">
              Interview
            </option>

            <option value="offer">
              Offer
            </option>

            <option value="rejected">
              Rejected
            </option>

          </select>

        </div>

        {/* JOB LIST */}
        {loading ? (  // ✅ Fixed: proper nested ternary

          <div className="text-center py-16 text-slate-400">
            Loading jobs...
          </div>

        ) : jobs.length === 0 ? (

          <div className="text-center py-16 text-slate-400">

            <p className="text-lg mb-2">
              No jobs found
            </p>

            <p className="text-sm">
              Start by adding your first application.
            </p>

          </div>

        ) : (

          <>

            <div className="grid gap-4">

              {currentJobs.map((job) => (

                <div
                  key={job._id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex justify-between transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
                >

                  <div className="min-w-0 flex-1">

                    <h3 className="text-base sm:text-lg font-semibold truncate">
                      {job.role}
                    </h3>

                    <p className="text-sm text-slate-400 truncate">
                      {job.company}
                    </p>

                    <span
                      className={`inline-block mt-2 px-3 py-1 text-xs rounded-full capitalize
                        ${
                          job.status === "applied"
                            ? "bg-blue-500/20 text-blue-400"
                            : job.status === "interview"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : job.status === "offer"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }
                      `}
                    >
                      {job.status}
                    </span>

                  </div>

                  <div className="flex gap-3 shrink-0 items-center">

                    <Link
                      to={`/edit-job/${job._id}`}
                      className="px-3 py-1.5 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500/10 text-xs sm:text-sm font-medium transition"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg border border-red-500 text-red-400 hover:bg-red-500/10 text-xs sm:text-sm font-medium transition"
                      onClick={() => deleteJob(job._id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* PAGINATION */}
            {jobs.length > jobsPerPage && (

              <div className="flex justify-center items-center gap-4 mt-8">

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-slate-300">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white disabled:opacity-50"
                >
                  Next
                </button>

              </div>

            )}

          </>

        )}

      </div>

    </div>
  );
}