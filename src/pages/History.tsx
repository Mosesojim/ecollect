import { useState, useEffect } from "react";
import { Calendar, Search, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

interface RequestData {
  id: string;
  status: string;
  type: string;
  date: string;
  address: string;
  points: number;
}

export function History() {
  const [data, setData] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    async function fetchHistory() {
      let supabaseData: RequestData[] = [];
      if (user) {
        try {
          const { data, error } = await supabase
            .from("requests")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (error) throw error;
          supabaseData = data || [];
        } catch (err: any) {
          setError(err.message);
        }
      }
      
      const localData = JSON.parse(localStorage.getItem('anonymous_requests') || '[]');
      const combined = [...supabaseData, ...localData].sort((a, b) => new Date(b.created_at || b.date).getTime() - new Date(a.created_at || a.date).getTime());
      
      setData(combined);
      setLoading(false);
    }

    fetchHistory();
  }, [user]);

  const filteredData = data.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.id.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q) ||
      item.date.toLowerCase().includes(q)
    );
  });

  return (
    <main className="bg-white text-slate-900 w-full overflow-x-hidden min-h-[calc(100vh-100px)]">
      <div className="px-4 md:px-6 lg:px-12 py-12 lg:py-24 max-w-[1600px] mx-auto w-full">
      

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4">
            Pickup History
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Track all your past and upcoming waste collection requests.
          </p>
        </div>

        <div className="relative w-full md:w-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID or Type..."
            className="w-full md:w-80 bg-slate-50 border border-slate-200 rounded py-3 pl-12 pr-4 text-slate-900 focus:outline-none focus:border-[#8CC63F] transition-colors"
          />
          <Search className="w-5 h-5 text-slate-600 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="bg-slate-50 rounded shadow-xl overflow-hidden min-h-[400px] w-full max-w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full p-12">
            <div className="text-slate-600">Loading history...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full p-12 text-red-500 gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-12 text-slate-600">
            <Calendar className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg">
              No pickup history found matching your search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-white border-b border-slate-200">
                  <th className="p-4 md:p-6 text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th className="p-4 md:p-6 text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider">
                    Service Type
                  </th>
                  <th className="p-4 md:p-6 text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="p-4 md:p-6 text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider">
                    Eco Points
                  </th>
                  <th className="p-4 md:p-6 text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredData.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="hover:bg-brand-text/10 transition-colors"
                  >
                    <td className="p-4 md:p-6 font-mono text-sm text-slate-700">
                      #{item.id.slice(0, 6)}
                    </td>
                    <td className="p-4 md:p-6 font-medium text-sm md:text-base text-slate-900">
                      {item.type}
                    </td>
                    <td className="p-4 md:p-6 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 md:p-6 text-[#8CC63F] font-medium text-sm md:text-base">
                      +{item.points || 0} pt
                    </td>
                    <td className="p-4 md:p-6">
                      <span
                        className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider inline-block ${
                          item.status === "Pending"
                            ? "bg-amber-500/10 text-amber-500"
                            : item.status === "Completed"
                              ? "bg-brand-text/10 text-slate-700"
                              : "bg-[#8CC63F]/10 text-[#8CC63F]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </main>
  );
}
