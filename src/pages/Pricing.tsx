import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { getPlans } from "../lib/pricing";



export function Pricing() {
  const navigate = useNavigate();

  return (
    <main className="px-4 md:px-6 lg:px-12 py-8 lg:py-16 max-w-[1600px] mx-auto w-full overflow-x-hidden md:overflow-x-visible">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-brand-text">
          Pricing Table
        </h1>
        <p className="text-brand-text-muted text-base md:text-lg">
          Smart Waste Disposal for a Cleaner Future
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {getPlans().map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="bg-brand-secondary rounded-lg overflow-hidden shadow-lg border border-brand-border hover:-translate-y-1 transition-transform duration-300 flex flex-col"
          >
            <div className="p-4 md:p-6 text-center bg-brand-primary">
              <h3 className="text-xl md:text-2xl font-bold text-brand-text mb-1">
                {plan.name}
              </h3>
              <p className="text-sm md:text-base text-brand-text-muted">
                {plan.subtitle}
              </p>
            </div>
            <div className="bg-[#8CC63F] p-4 md:p-6 text-center text-[#18201A]">
              <div className="flex items-start justify-center">
                <span className="text-xl md:text-2xl font-bold mt-1 md:mt-2">
                  ₦
                </span>
                <span className="text-5xl md:text-6xl font-bold tracking-tighter">
                  {plan.price}
                </span>
              </div>
              
            </div>
            <div className="p-4 md:p-5 flex-1 flex flex-col">
              <h4 className="text-base font-bold text-brand-text mb-3">
                Services Included
              </h4>
              <ul className="space-y-2.5 mb-5 flex-1">
                {plan.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-brand-text-muted"
                  >
                    <Check className="w-4 h-4 text-[#8CC63F] shrink-0 stroke-[3]" />
                    <span className="font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() =>
                  navigate(`/appointment?plan=${encodeURIComponent(plan.name)}`)
                }
                className="w-full bg-brand-primary border border-brand-border text-brand-text font-bold py-2.5 rounded hover:bg-[#8CC63F] hover:text-[#18201A] hover:border-[#8CC63F] transition-all text-sm"
              >
                Select Plan
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
