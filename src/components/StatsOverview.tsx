import { Leaf, Truck, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export function StatsOverview() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statsData, setStatsData] = useState([
    {
      label: "Total Pickups",
      value: "0",
      icon: Truck,
      bg: "bg-white",
      text: "text-slate-900",
    },
    {
      label: "Waste Diverted",
      value: "0",
      unit: "kg",
      icon: Leaf,
      bg: "bg-[#8CC63F]",
      text: "text-[#18201A]",
    },
    {
      label: "Eco Points",
      value: "0",
      icon: Award,
      bg: "bg-white",
      text: "text-slate-900",
    },
  ]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;

      const { data: requests, error } = await supabase
        .from("requests")
        .select("points, status")
        .eq("user_id", user.id);

      if (error || !requests) return;

      const totalPickups = requests.length;
      let totalPoints = 0;
      let wasteDiverted = 0;

      requests.forEach((req) => {
        const pts = req.points || 10;
        totalPoints += pts;
        wasteDiverted += pts * 0.5;
      });

      setStatsData([
        {
          label: "Total Pickups",
          value: totalPickups.toString(),
          icon: Truck,
          bg: "bg-white",
          text: "text-slate-900",
        },
        {
          label: "Waste Diverted",
          value: Math.round(wasteDiverted).toString(),
          unit: "kg",
          icon: Leaf,
          bg: "bg-[#8CC63F]",
          text: "text-[#18201A]",
        },
        {
          label: "Eco Points",
          value: totalPoints.toLocaleString(),
          icon: Award,
          bg: "bg-white",
          text: "text-slate-900",
        },
      ]);
    }
    fetchStats();
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % statsData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [statsData.length]);

  return (
    <div className="mb-12">
      {/* Mobile Slide View */}
      <div className="md:hidden relative h-[240px] rounded overflow-hidden shadow-lg border border-brand-border/10">
        {statsData.map((stat, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === i ? "opacity-100 z-10" : "opacity-0 z-0"} ${stat.bg} ${stat.text} p-8 flex flex-col justify-between`}
          >
            <div className="flex justify-between items-start mb-12">
              <h4 className="text-5xl font-bold tracking-tighter">
                {stat.value}
                {stat.unit && (
                  <span className="text-2xl font-medium opacity-80 ml-1">
                    {stat.unit}
                  </span>
                )}
              </h4>
              <stat.icon className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-lg font-medium opacity-90">{stat.label}</p>
          </div>
        ))}
        {/* Slide Indicators */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
          {statsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? "bg-brand-text w-6" : "bg-brand-text/30"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {statsData.map((stat, i) => (
          <div
            key={i}
            className={`${stat.bg} ${stat.text} p-8 lg:p-10 rounded shadow-lg flex flex-col justify-between hover:-translate-y-1 transition-transform shrink-0`}
          >
            <div className="flex justify-between items-start mb-12">
              <h4 className="text-5xl lg:text-6xl font-bold tracking-tighter">
                {stat.value}
                {stat.unit && (
                  <span className="text-2xl font-medium opacity-80 ml-1">
                    {stat.unit}
                  </span>
                )}
              </h4>
              <stat.icon className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-lg font-medium opacity-90">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
