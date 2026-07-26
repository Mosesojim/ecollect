import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { useMemo } from "react";
import { Truck, CheckCircle, Clock } from "lucide-react";

interface RequestData {
  id: string;
  user_id: string;
  status: string;
  type: string;
  date: string;
  address: string;
  points: number;
}

const COLORS = ["#8CC63F", "#38bdf8", "#fbbf24", "#f87171", "#c084fc", "#94a3b8"];

export function AdminStats({ data }: { data: RequestData[] }) {
  const stats = useMemo(() => {
    let completed = 0;
    let pending = 0;
    let totalPoints = 0;
    
    // Group by month
    const monthlyData: Record<string, number> = {};
    const serviceData: Record<string, number> = {};

    data.forEach((req) => {
      if (req.status.toLowerCase() === "completed") {
        completed++;
      } else {
        pending++;
      }
      totalPoints += req.points || 0;

      // Format month
      const d = new Date(req.date);
      const month = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      monthlyData[month] = (monthlyData[month] || 0) + 1;

      // Format service
      const type = req.type || "Other";
      const shortType = type.replace(" Bin", "").replace(" Waste", "").replace(" Collection", "").replace(" Program", "");
      serviceData[shortType] = (serviceData[shortType] || 0) + 1;
    });

    const monthlyTrend = Object.keys(monthlyData).map((month) => ({
      name: month,
      val: monthlyData[month],
    }));

    // Sort monthly trend chronologically (roughly)
    monthlyTrend.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    const services = Object.keys(serviceData).map((type) => ({
      name: type,
      val: serviceData[type],
    }));
    services.sort((a, b) => b.val - a.val);

    return {
      completed,
      pending,
      total: data.length,
      monthlyTrend,
      services
    };
  }, [data]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-4xl font-bold tracking-tighter text-slate-900">{stats.total}</h4>
            <Truck className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-600">Total Pickups</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-4xl font-bold tracking-tighter text-[#8CC63F]">{stats.completed}</h4>
            <CheckCircle className="w-6 h-6 text-[#8CC63F]" />
          </div>
          <p className="text-sm font-medium text-slate-600">Completed</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-4xl font-bold tracking-tighter text-amber-500">{stats.pending}</h4>
            <Clock className="w-6 h-6 text-amber-500" />
          </div>
          <p className="text-sm font-medium text-slate-600">Pending</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
        {/* Trend Chart */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-lg flex flex-col overflow-hidden h-full">
          <div className="mb-6">
            <h2 className="font-semibold text-slate-900 text-xl">Monthly Trend</h2>
            <p className="text-slate-600 mt-1 text-sm">Number of pickups over time</p>
          </div>
          <div className="flex-1 w-full mt-2">
            {stats.monthlyTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8CC63F" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8CC63F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", color: "#0f172a" }}
                    itemStyle={{ color: "#8CC63F", fontWeight: "bold" }}
                  />
                  <Area type="monotone" dataKey="val" stroke="#8CC63F" strokeWidth={3} fillOpacity={1} fill="url(#colorTrend)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">No data available</div>
            )}
          </div>
        </div>

        {/* Services Chart */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-lg flex flex-col overflow-hidden h-full">
          <div className="mb-6">
            <h2 className="font-semibold text-slate-900 text-xl">Service Breakdown</h2>
            <p className="text-slate-600 mt-1 text-sm">Distribution of requested plans</p>
          </div>
          <div className="flex-1 w-full mt-2">
            {stats.services.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.services} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} width={80} />
                  <Tooltip
                    cursor={{ fill: "#f1f5f9" }}
                    contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", color: "#0f172a" }}
                    itemStyle={{ color: "#8CC63F", fontWeight: "bold" }}
                  />
                  <Bar dataKey="val" radius={[0, 4, 4, 0]} barSize={20}>
                    {stats.services.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
