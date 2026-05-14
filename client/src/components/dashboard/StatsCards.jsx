import { useEffect, useState } from "react";
import axios from "axios";

const StatsCards = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
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

        setStats(res.data);

      } catch (error) {
        console.error("Failed to fetch analytics", error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!stats) {
    return <p className="text-center mt-10">Loading analytics...</p>;
  }

  const cards = [
    {
      title: "Applications",
      value: stats.totalApplications,
    },
    {
      title: "Interviews",
      value: stats.interviews,
    },
    {
      title: "Offers",
      value: stats.offers,
    },
    {
      title: "Rejections",
      value: stats.rejections,
    },
    {
      title: "Interview Rate",
      value: stats.interviewRate,
    },
    {
      title: "Offer Rate",
      value: stats.offerRate,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition"
        >
          <h3 className="text-gray-500 text-sm mb-2">
            {card.title}
          </h3>

          <p className="text-3xl font-bold text-gray-800">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;