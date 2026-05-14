import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#eab308",
  "#22c55e",
  "#ef4444"
];

const StatusPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/v1/analytics/summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const stats = res.data;

        setData([
          { name: "Applied", value: stats.totalApplications },
          { name: "Interviews", value: stats.interviews },
          { name: "Offers", value: stats.offers },
          { name: "Rejections", value: stats.rejections },
        ]);

      } catch (error) {
        console.error("Pie chart fetch failed", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6 text-white">
        Application Status
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatusPieChart;