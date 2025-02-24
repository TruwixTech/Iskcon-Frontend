import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
 
const data = [
  { name: "Jan", sales: 10000, cost: 12000 },
  { name: "Feb", sales: 8000, cost: 10000 },
  { name: "Mar", sales: 9000, cost: 9500 },
  { name: "Apr", sales: 15000, cost: 12000 },
  { name: "May", sales: 12000, cost: 11000 },
  { name: "Jun", sales: 11000, cost: 10500 },
];
 
const RevenueChart = () => {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-md">
      <h3 className="text-gray-600 text-center">Revenue vs Cost</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} />
          <Line type="monotone" dataKey="cost" stroke="#6b7280" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
 
export default RevenueChart;