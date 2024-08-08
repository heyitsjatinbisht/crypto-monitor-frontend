import React, { useEffect, useState } from "react";
import axios from "axios";

interface Alert {
  symbol: string;
  threshold: number;
  direction: string;
}

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterSymbol, setFilterSymbol] = useState<string>("");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get<{ data: Alert[] }>("/api/alerts");
        setAlerts(response.data.data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const handleRemove = async (symbol: string) => {
    try {
      await axios.delete(`/api/alerts/${symbol}`);
      setAlerts(alerts.filter((alert) => alert.symbol !== symbol));
    } catch (error) {
      console.error("Error removing alert:", error);
    }
  };

  const sortedAlerts = [...alerts].sort((a, b) => {
    return sortOrder === "asc"
      ? a.threshold - b.threshold
      : b.threshold - a.threshold;
  });

  const filteredAlerts = sortedAlerts.filter((alert) =>
    alert.symbol.toLowerCase().includes(filterSymbol.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (alerts.length === 0)
    return <p className="text-center text-gray-500">No alerts set.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Your Alerts
      </h1>

      {/* Filter and Sort Controls */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Filter by symbol"
          value={filterSymbol}
          onChange={(e) => setFilterSymbol(e.target.value)}
          className="border border-gray-300 rounded-md p-3 w-full md:w-1/2 mr-4 text-gray-700"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border border-gray-300 rounded-md p-3 text-gray-700"
        >
          <option value="asc">Sort by Threshold (Ascending)</option>
          <option value="desc">Sort by Threshold (Descending)</option>
        </select>
      </div>

      <ul className="space-y-4">
        {filteredAlerts.map((alert, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                {alert.symbol}
              </span>
              <span
                className={`text-sm ${
                  alert.direction === "above"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {alert.direction} {alert.threshold}
              </span>
            </div>
            <button
              onClick={() => handleRemove(alert.symbol)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsPage;
