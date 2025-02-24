import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const statsData = [
  { title: "Net Sales", amount: 1980.0, change: 62, isPositive: true },
  { title: "Cost of goods sold", amount: 990.0, change: 5.2, isPositive: false },
  { title: "Gross profit", amount: 879.0, change: 62, isPositive: true },
  { title: "Stock on hand", amount: 230.0, change: 2.4, isPositive: false },
];

export default function StatsCard() {
  return (
    <div className="bg-[#FEF4DC] py-4 flex">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white py-4 rounded-2xl shadow-md w-60 text-center"
          >
            <p className="text-gray-600">{stat.title}</p>
            <h2 className="text-2xl font-bold">₹ {stat.amount.toFixed(2)}</h2>
            <div className={`flex items-center justify-center text-sm mt-1 ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>
              {stat.isPositive ? <FaArrowUp /> : <FaArrowDown />}
              <span className="ml-1">{stat.change}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
