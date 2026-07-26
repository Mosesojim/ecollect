import { ActiveRequests } from "../components/ActiveRequests";
import { StatsOverview } from "../components/StatsOverview";
import { ImageGallery } from "../components/ImageGallery";
import { Link } from "react-router-dom";
import { Recycle } from "lucide-react";
import { motion } from "motion/react";

export function Dashboard() {
  return (
    <>
      <main className="w-full overflow-x-hidden">
        {/* Hero Section */}
        <div className="relative w-full h-auto min-h-[70vh] py-24 md:py-32 flex flex-col items-center justify-center pb-12 md:pb-24 text-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop"
              alt="People Recycling"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto px-4 md:px-6">
            <div className="border-2 border-blue-400/60 bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col items-center w-full mb-8 shadow-2xl">
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
                <Recycle className="w-8 h-8 md:w-10 md:h-10 text-[#8CC63F]" />
                <span className="text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-white">
                  ecollect<span className="text-[#8CC63F]">.</span>
                </span>
              </div>
              <div className="inline-block text-[#8CC63F] font-bold tracking-wider md:tracking-widest uppercase mb-8 text-[10px] md:text-xs text-center">
                Smart Disposal For Cleaner World
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col items-center p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl transition-all hover:bg-yellow-500/20">
                  <span className="text-yellow-400 font-bold mb-1 text-sm md:text-base">Yellow Bin</span>
                  <span className="text-white/80 text-xs md:text-sm text-center">Plastics & Metals</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col items-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl transition-all hover:bg-blue-500/20">
                  <span className="text-blue-400 font-bold mb-1 text-sm md:text-base">Blue Bin</span>
                  <span className="text-white/80 text-xs md:text-sm text-center">Paper & Cardboard</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col items-center p-4 bg-red-500/10 border border-red-500/30 rounded-xl transition-all hover:bg-red-500/20">
                  <span className="text-red-400 font-bold mb-1 text-sm md:text-base">Red Bin</span>
                  <span className="text-white/80 text-xs md:text-sm text-center">General Waste</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col items-center p-4 bg-[#8CC63F]/10 border border-[#8CC63F]/30 rounded-xl transition-all hover:bg-[#8CC63F]/20">
                  <span className="text-[#8CC63F] font-bold mb-1 text-sm md:text-base">Green Bin</span>
                  <span className="text-white/80 text-xs md:text-sm text-center">Organic & Compost</span>
                </motion.div>
              </div>
            </div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-5 md:mb-6 text-white drop-shadow-lg max-w-4xl mx-auto text-center">
              Turning Waste Into New Possibilities
            </motion.h1>
            <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed font-medium">
              Delivering smart waste solutions for homes and communities to keep
              our environment clean every day.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 w-full sm:w-auto">
              <Link
                to="/history"
                className="bg-[#8CC63F] text-[#18201A] font-bold px-6 md:px-8 py-3 rounded hover:bg-white hover:text-brand-primary transition-colors text-center text-sm md:text-base w-full sm:w-auto"
              >
                View History
              </Link>
              <Link
                to="/services"
                className="bg-transparent border border-white/30 text-white font-bold px-6 md:px-8 py-3 rounded hover:bg-white/10 transition-colors text-center text-sm md:text-base w-full sm:w-auto backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[#8CC63F] py-3 md:py-4 overflow-hidden w-full block whitespace-nowrap">
          <div className="animate-marquee flex gap-8 md:gap-12 text-[#18201A] font-bold text-lg md:text-xl uppercase tracking-wider">
            <span>♻️ Organic Waste</span>
            <span>♻️ Waste Consulting</span>
            <span>♻️ Waste Collection</span>
            <span>♻️ Smart Disposal</span>
            <span>♻️ Organic Waste</span>
            <span>♻️ Waste Consulting</span>
            <span>♻️ Waste Collection</span>
            <span>♻️ Smart Disposal</span>
          </div>
        </div>

        {/* White Section for Stats */}
        <div className="bg-white text-slate-900 w-full py-12 md:py-20 px-4 md:px-6 lg:px-12">
          <div className="max-w-[1600px] mx-auto">
            <StatsOverview />
            
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-[#f0fdf4] text-slate-900 w-full py-12 md:py-20 px-4 md:px-6 lg:px-12">
          <div className="max-w-[1600px] mx-auto">
            <ImageGallery />
          </div>
        </div>

        {/* Active Requests Section in original brand theme */}
        <div className="px-4 md:px-6 lg:px-12 py-12 md:py-20 max-w-[1600px] mx-auto">
          <div className="pb-8 lg:pb-0">
            <div className="w-full max-w-full overflow-hidden">
              <ActiveRequests />
            </div>
          </div>
        </div>
      </main>

          </>
  );
}