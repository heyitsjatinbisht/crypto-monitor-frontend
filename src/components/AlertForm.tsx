import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define types for better type safety
interface SymbolOption {
  symbol: string;
  name: string;
}

const AlertForm: React.FC = () => {
  const [symbols, setSymbols] = useState<SymbolOption[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const [threshold, setThreshold] = useState<number>(0);
  const [direction, setDirection] = useState<string>("above");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    // Fetch symbols when the component mounts
    const fetchSymbols = async () => {
      try {
        const response = await axios.get("/api/symbols");
        setSymbols(response.data.data || []);
      } catch (error) {
        console.error("Error fetching symbols:", error);
      }
    };

    fetchSymbols();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSymbol || threshold <= 0) {
      setStatus("Please select a symbol and set a valid threshold.");
      return;
    }
    try {
      await axios.post("/api/alerts", {
        symbol: selectedSymbol,
        threshold,
        direction,
      });
      toast.success("Alert set successfully!"); // Show success toast
      setStatus("");
    } catch (error) {
      console.error("Error setting alert", error);
      toast.error("Failed to set alert"); // Show error toast
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Set Alert
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Symbol
          </label>
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          >
            <option value="">Select a symbol</option>
            {symbols.map((symbol) => (
              <option key={symbol.symbol} value={symbol.symbol}>
                {symbol.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Threshold
          </label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Direction
          </label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          >
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium"
        >
          Set Alert
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default AlertForm;
