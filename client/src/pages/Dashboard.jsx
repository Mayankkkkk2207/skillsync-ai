import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs")
      .then((res) => setJobs(res.data.data))
      .catch(() => {});
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Jobs</h1>
        <Link
          to="/add-job"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs added yet.</p>
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
              </div>

              <span className="text-sm capitalize">
                {job.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
