import { Truck, Leaf, Award, Recycle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

const SERVICES = [
  {
    title: "General Waste Collection",
    description:
      "Reliable weekly collection of non-recyclable household waste.",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=2072&auto=format&fit=crop",
  },
  {
    title: "Recycling Program",
    description:
      "Comprehensive sorting and recycling for plastics, glass, and paper.",
    icon: Recycle,
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Organic Composting",
    description:
      "Transform your organic waste into nutrient-rich compost for local gardens.",
    icon: Leaf,
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Eco Points & Rewards",
    description:
      "Earn points for proper recycling to redeem for eco-friendly products.",
    icon: Award,
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop",
  },
];

export function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SERVICES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-white text-slate-900 w-full overflow-x-hidden min-h-screen flex flex-col">
      <div className="px-4 md:px-6 lg:px-12 py-12 lg:py-24 max-w-[1600px] mx-auto w-full">
      <div className="mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6">
          Our Services
        </h1>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl">
          We offer a comprehensive range of waste management solutions designed
          to reduce environmental impact and simplify disposal.
        </p>
      </div>

      {/* Mobile Slide View */}
      <div className="md:hidden relative pb-12">
        <div className="overflow-hidden w-full rounded shadow-lg border border-slate-200 bg-slate-50">
          <div
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {SERVICES.map((service, idx) => (
              <div key={idx} className="w-full min-w-full shrink-0">
                <div className="group">
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-colors" />
                    <div className="absolute top-4 left-4 w-10 h-10 bg-[#8CC63F] rounded flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-[#18201A]" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 mb-6">
                      {service.description}
                    </p>
                    <Link
                      to={`/appointment?plan=${encodeURIComponent(service.title)}`}
                      className="text-[#8CC63F] font-bold uppercase tracking-wider text-xs md:text-sm hover:text-slate-900 transition-colors"
                    >
                      Book Service &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
          {SERVICES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? "bg-[#8CC63F] w-6" : "bg-brand-text/30"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        {SERVICES.map((service, idx) => (
          <div
            key={idx}
            className="bg-slate-50 rounded overflow-hidden shadow-lg group hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute top-6 left-6 w-12 h-12 bg-[#8CC63F] rounded flex items-center justify-center">
                <service.icon className="w-6 h-6 text-[#18201A]" />
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-8">
                {service.description}
              </p>
              <Link
                to={`/appointment?plan=${encodeURIComponent(service.title)}`}
                className="text-[#8CC63F] font-bold uppercase tracking-wider text-sm hover:text-slate-900 transition-colors"
              >
                Book Service &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </main>
  );
}
