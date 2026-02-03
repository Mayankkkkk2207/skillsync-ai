import api from "../api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/jobs/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}
