import { useState, useRef } from "react";
import { RequestForm } from "../components/RequestForm";
import { Check } from "lucide-react";
import { getPlans } from "../lib/pricing";
import { motion } from "motion/react";



export function Appointment() {
  const [selectedService, setSelectedService] = useState("Select Service");
  const [PLANS, setPLANS] = useState(getPlans());
  const formRef = useRef<HTMLDivElement>(null);

  // Update plans if local storage changes (optional, useful if navigating back from admin)
  // For now just use initial load

  return (
    <main className="bg-white text-slate-900 w-full overflow-x-hidden min-h-[calc(100vh-100px)] flex flex-col justify-center">
      <div className="px-4 md:px-6 lg:px-12 py-12 lg:py-24 max-w-[1600px] mx-auto w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-slate-900">
          Book & Select Plan
        </h1>
        <p className="text-slate-600 text-base md:text-lg">
          Choose your plan and schedule your pickup
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto">
        {/* Left side: Pricing Plans */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`bg-slate-50 rounded-lg overflow-hidden shadow-lg border hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer ${
                  selectedService === plan.name
                    ? "border-[#8CC63F] ring-2 ring-[#8CC63F]"
                    : "border-slate-200"
                }`}
                onClick={() => {
                  setSelectedService(plan.name);
                  if (formRef.current) {
                    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                <div className="p-4 text-center bg-white">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {plan.subtitle}
                  </p>
                </div>
                <div className="bg-[#8CC63F] p-4 text-center text-[#18201A]">
                  <div className="flex items-start justify-center">
                    <span className="text-lg font-bold mt-1">₦</span>
                    <span className="text-4xl font-bold tracking-tighter">
                      {plan.price}
                    </span>
                  </div>
                  <div className="text-xs font-bold opacity-80 mt-1">
                    
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="text-sm font-bold text-slate-900 mb-3">
                    Included
                  </h4>
                  <ul className="space-y-2 flex-1">
                    {plan.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs text-slate-600"
                      >
                        <Check className="w-3.5 h-3.5 text-[#8CC63F] shrink-0 stroke-[3]" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full mt-4 font-bold py-2 rounded transition-all text-xs border ${
                      selectedService === plan.name
                        ? "bg-[#8CC63F] text-[#18201A] border-[#8CC63F]"
                        : "bg-white text-slate-900 border-slate-200 hover:bg-[#8CC63F] hover:text-[#18201A] hover:border-[#8CC63F]"
                    }`}
                  >
                    {selectedService === plan.name ? "Selected" : "Select Plan"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right side: Request Form */}
        <motion.div ref={formRef} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-5 h-full">
          <RequestForm
            selectedServiceProp={selectedService}
            onServiceChangeProp={setSelectedService}
          />
        </motion.div>
      </div>
    </div>
    </main>
  );
}
