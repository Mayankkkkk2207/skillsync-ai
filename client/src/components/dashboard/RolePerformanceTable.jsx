import { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const RolePerformanceTable = () => {
  const [roles, setRoles] = useState([]);
  const [sortBy, setSortBy] = useState("applications");

  useEffect(() => {
    const fetchRoleAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/v1/analytics/roles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRoles(res.data.roles);

      } catch (error) {
        console.error("Failed to fetch role analytics", error);
      }
    };

    fetchRoleAnalytics();
  }, []);

  const filteredRoles = [...roles]
  .sort((a, b) => {

    if (sortBy === "applications") {
      return b.totalApplications - a.totalApplications;
    }

    if (sortBy === "offers") {
      return b.offers - a.offers;
    }

    if (sortBy === "success") {
      return (
        parseFloat(b.successRate) -
        parseFloat(a.successRate)
      );
    }

    return 0;
  });

  const exportCSV = () => {

  const headers = [
    "Role",
    "Applications",
    "Interviews",
    "Offers",
    "Interview Rate",
    "Success Rate"
  ];

  const rows = filteredRoles.map((role) => [
    role.role,
    role.totalApplications,
    role.interviews,
    role.offers,
    role.interviewRate,
    role.successRate,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(","))
  ].join("\n");

  const blob = new Blob(
    [csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  saveAs(blob, "role-performance-analytics.csv");
};

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <h2 className="text-2xl font-semibold text-white">
          Role Performance Analytics
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
  onClick={exportCSV}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
>
  Export CSV
</button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="applications">
              Sort by Applications
            </option>

            <option value="offers">
              Sort by Offers
            </option>

            <option value="success">
              Sort by Success Rate
            </option>

          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full text-left border-collapse">

          <thead>
            <tr className="border-b border-slate-700 text-slate-400">

              <th className="py-3 px-4">
                Role
              </th>

              <th className="py-3 px-4">
                Applications
              </th>

              <th className="py-3 px-4">
                Interviews
              </th>

              <th className="py-3 px-4">
                Offers
              </th>

              <th className="py-3 px-4">
                Interview Rate
              </th>

              <th className="py-3 px-4">
                Success Rate
              </th>

            </tr>
          </thead>

          <tbody>

            {filteredRoles.map((role, index) => (

              <tr
                key={index}
                className="border-b border-slate-800 hover:bg-slate-900 transition"
              >

                <td className="py-4 px-4 font-medium text-white">
                  {role.role}
                </td>

                <td className="py-4 px-4 text-slate-300">
                  {role.totalApplications}
                </td>

                <td className="py-4 px-4 text-yellow-400">
                  {role.interviews}
                </td>

                <td className="py-4 px-4 text-green-400">
                  {role.offers}
                </td>

                <td className="py-4 px-4 text-blue-400">
                  {role.interviewRate}
                </td>

                <td className="py-4 px-4 text-pink-400 font-semibold">
                  {role.successRate}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default RolePerformanceTable;