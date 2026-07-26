import { useState, useEffect } from "react";
import {
  Search,
  AlertCircle,
  MapPin,
  User,
  Calendar,
  Trash2,
  Lock,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { getPlans, savePlans } from "../lib/pricing";
import { AdminStats } from "../components/AdminStats";

interface RequestData {
  id: string;
  user_id: string;
  status: string;
  type: string;
  date: string;
  address: string;
  points: number;
}

export function AdminPickups() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [data, setData] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "pickups" | "pricing">("dashboard");
  const [plans, setPlans] = useState(getPlans());

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchPickups();
    }
  }, []);

  const handleLogin = (e: import("react").FormEvent) => {
    e.preventDefault();
    // Unique ID and password for company admin
    if (adminId === "admin" && adminPassword === "ecollect-admin-2024") {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      fetchPickups();
    } else {
      setAuthError("Invalid Admin ID or Password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    setData([]);
  };

  async function fetchPickups() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const localData = JSON.parse(localStorage.getItem('anonymous_requests') || '[]');
      const combined = [...(data || []), ...localData].sort((a, b) => new Date(b.created_at || b.date).getTime() - new Date(a.created_at || a.date).getTime());
      
      setData(combined);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSavePlans = () => {
    savePlans(plans);
    alert("Pricing updated successfully!");
  };

  const handlePlanChange = (index: number, field: string, value: string) => {
    const newPlans = [...plans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    setPlans(newPlans);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("requests")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      fetchPickups(); // Refresh data
    } catch (err: any) {
      alert("Error updating status: " + err.message);
    }
  };

  const deleteRequest = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this pickup request?"))
      return;

    try {
      const { error } = await supabase.from("requests").delete().eq("id", id);

      if (error) throw error;
      fetchPickups();
    } catch (err: any) {
      alert("Error deleting request: " + err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-brand-secondary rounded-2xl shadow-2xl border border-brand-border overflow-hidden p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#8CC63F]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
          <p className="text-brand-text-muted text-center mb-8">
            Please enter your unique admin credentials to view the dashboard.
          </p>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded mb-6 text-sm text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                Admin ID
              </label>
              <input
                type="text"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full bg-brand-primary border border-brand-border rounded py-3 px-4 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
                placeholder="Enter unique ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-brand-primary border border-brand-border rounded py-3 px-4 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#8CC63F] text-[#18201A] font-bold py-3.5 px-4 rounded hover:bg-brand-text hover:text-brand-primary transition-colors mt-6"
            >
              Access Dashboard
            </button>
          </form>
        </div>
    </main>
    );
  }

  const filteredData = data.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.id.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q) ||
      item.address.toLowerCase().includes(q) ||
      item.user_id.toLowerCase().includes(q)
    );
  });

  const pendingCount = data.filter(
    (d) => d.status.toLowerCase() === "pending",
  ).length;
  const totalCount = data.length;

  return (
    <main className="px-4 md:px-6 lg:px-12 py-12 lg:py-24 max-w-[1600px] mx-auto w-full overflow-x-hidden md:overflow-x-visible">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4">
            Admin Dashboard
          </h1>
          <p className="text-brand-text-muted text-base md:text-lg">
            Manage customer pickup requests and configure plans.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {activeTab === "pickups" && (
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pickups..."
                className="w-full bg-brand-secondary border border-brand-border rounded py-3 pl-12 pr-4 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
              />
              <Search className="w-5 h-5 text-brand-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          )}
          <button
            onClick={handleLogout}
            className="bg-brand-secondary border border-brand-border rounded py-3 px-6 text-brand-text hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-colors shrink-0"
          >
            Lock Admin
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`py-2 px-6 rounded font-bold transition-colors ${activeTab === "dashboard" ? "bg-[#8CC63F] text-[#18201A]" : "bg-brand-secondary text-brand-text hover:bg-white/5"}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("pickups")}
            className={`py-2 px-6 rounded font-bold transition-colors ${activeTab === "pickups" ? "bg-[#8CC63F] text-[#18201A]" : "bg-brand-secondary text-brand-text hover:bg-white/5"}`}
          >
            Pickups
          </button>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`py-2 px-6 rounded font-bold transition-colors ${activeTab === "pricing" ? "bg-[#8CC63F] text-[#18201A]" : "bg-brand-secondary text-brand-text hover:bg-white/5"}`}
          >
            Pricing & Plans
          </button>
        </div>


      {activeTab === "dashboard" ? (
        <AdminStats data={data} />
      ) : activeTab === "pricing" ? (
        <div className="bg-brand-secondary rounded shadow-xl overflow-hidden p-6 w-full max-w-full">
          <h2 className="text-2xl font-bold mb-6 text-brand-text">Pricing Settings</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {plans.map((plan: any, idx: number) => (
              <div key={idx} className="bg-brand-primary p-4 rounded-lg border border-brand-border flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-text-muted uppercase mb-1">Plan Name</label>
                  <input type="text" value={plan.name} onChange={(e) => handlePlanChange(idx, "name", e.target.value)} className="w-full bg-brand-secondary border border-brand-border rounded py-2 px-3 text-brand-text focus:outline-none focus:border-[#8CC63F]" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-brand-text-muted uppercase mb-1">Price (₦)</label>
                    <input type="text" value={plan.price} onChange={(e) => handlePlanChange(idx, "price", e.target.value)} className="w-full bg-brand-secondary border border-brand-border rounded py-2 px-3 text-brand-text focus:outline-none focus:border-[#8CC63F]" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-brand-text-muted uppercase mb-1">Subtitle</label>
                    <input type="text" value={plan.subtitle} onChange={(e) => handlePlanChange(idx, "subtitle", e.target.value)} className="w-full bg-brand-secondary border border-brand-border rounded py-2 px-3 text-brand-text focus:outline-none focus:border-[#8CC63F]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-text-muted uppercase mb-1">Features (comma separated)</label>
                  <input type="text" value={plan.features.join(", ")} onChange={(e) => handlePlanChange(idx, "features", e.target.value.split(",").map((f:string) => f.trim()))} className="w-full bg-brand-secondary border border-brand-border rounded py-2 px-3 text-brand-text focus:outline-none focus:border-[#8CC63F]" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button onClick={handleSavePlans} className="bg-[#8CC63F] text-[#18201A] font-bold py-3 px-8 rounded hover:bg-brand-text hover:text-brand-primary transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      ) : (
      <div className="bg-brand-secondary rounded shadow-xl overflow-hidden min-h-[400px] w-full max-w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full p-12">
            <div className="text-brand-text-muted">Loading pickups...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full p-12 text-red-500 gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-12 text-brand-text-muted">
            <Calendar className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg">No pickup requests found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-brand-primary border-b border-brand-border">
                  <th className="p-4 md:p-6 text-xs md:text-sm font-semibold text-brand-text-muted uppercase tracking-wider">
                    Request ID
                  </th>
                  <th className="p-4 md:p-6 text-xs md:text-sm font-semibold text-brand-text-muted uppercase tracking-wider">
                    Account (User ID)
                  </th>
                  <th className="p-4 md:p-6 text-xs md:text-sm font-semibold text-brand-text-muted uppercase tracking-wider">
                    Service & Address
                  </th>
                  <th className="p-4 md:p-6 text-xs md:text-sm font-semibold text-brand-text-muted uppercase tracking-wider">
                    Date
                  </th>
                  <th className="p-4 md:p-6 text-xs md:text-sm font-semibold text-brand-text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 md:p-6 text-xs md:text-sm font-semibold text-brand-text-muted uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-brand-text/10 transition-colors"
                  >
                    <td className="p-4 md:p-6 font-mono text-xs text-brand-text/80 align-top">
                      #{item.id.slice(0, 8)}...
                    </td>
                    <td className="p-4 md:p-6 text-sm text-brand-text align-top">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-[#8CC63F]" />
                        <span
                          className="font-mono text-xs opacity-70"
                          title={item.user_id}
                        >
                          {item.user_id.slice(0, 12)}...
                        </span>
                      </div>
                    </td>
                    <td className="p-4 md:p-6 align-top">
                      <div className="font-medium text-sm md:text-base text-brand-text mb-1">
                        {item.type}
                      </div>
                      <div className="flex items-start gap-1.5 text-sm text-brand-text-muted">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span className="break-words max-w-[200px]">
                          {item.address}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 md:p-6 text-sm align-top">
                      <div className="flex items-center gap-2 text-brand-text-muted">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 md:p-6 align-top">
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                        className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider outline-none cursor-pointer appearance-none ${
                          item.status === "Pending"
                            ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            : item.status === "Completed"
                              ? "bg-brand-text/10 text-brand-text/80 border border-brand-text/20"
                              : "bg-[#8CC63F]/10 text-[#8CC63F] border border-[#8CC63F]/20"
                        }`}
                      >
                        <option
                          value="Pending"
                          className="bg-brand-secondary text-brand-text"
                        >
                          Pending
                        </option>
                        <option
                          value="In Progress"
                          className="bg-brand-secondary text-brand-text"
                        >
                          In Progress
                        </option>
                        <option
                          value="Completed"
                          className="bg-brand-secondary text-brand-text"
                        >
                          Completed
                        </option>
                        <option
                          value="Cancelled"
                          className="bg-brand-secondary text-brand-text"
                        >
                          Cancelled
                        </option>
                      </select>
                    </td>
                    <td className="p-4 md:p-6 align-top text-right">
                      <button
                        onClick={() => deleteRequest(item.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
                        title="Delete Request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      )}
    </main>
  );
}
