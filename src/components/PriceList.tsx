import React, { useState, useEffect } from "react";
import axios from "axios";

interface PriceData {
  symbol: string;
  price: number;
}

const PriceList: React.FC = () => {
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get("/api/prices");
        const { data } = response.data; // Access the 'data' property
        setPrices(data); // Set prices to the array inside 'data'
      } catch (error) {
        console.error("Error fetching prices", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Cryptocurrency Prices
      </h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-4xl w-full">
        {prices.map(({ symbol, price }) => (
          <div
            key={symbol}
            className="p-6 border border-gray-300 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold capitalize mb-2 text-center">
              {symbol}
            </h2>
            <p className="text-gray-700 text-lg text-center">
              Price: ${price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceList;
