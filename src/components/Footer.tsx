import {
  Recycle,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const { error } = await supabase.from("subscribers").insert([{ email }]);

      if (error) {
        throw error;
      }
      setStatus("success");
      setEmail("");
    } catch (err: any) {
      console.error("Subscription error:", err.message);
      setStatus("error");
    }
  };

  return (
    <footer className="bg-brand-secondary pt-20 pb-10 border-t border-brand-border mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3">
              <Recycle className="w-10 h-10 text-[#8CC63F]" />
              <span className="text-3xl font-bold tracking-tight text-brand-text">
                ecollect<span className="text-[#8CC63F]">.</span>
              </span>
            </Link>
            <p className="text-brand-text-muted leading-relaxed">
              Leading the way in sustainable waste management and recycling
              solutions for a cleaner, greener tomorrow.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-brand-text hover:bg-[#8CC63F] hover:text-[#18201A] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-brand-text hover:bg-[#8CC63F] hover:text-[#18201A] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.974H5.078z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-brand-text hover:bg-[#8CC63F] hover:text-[#18201A] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-brand-text hover:bg-[#8CC63F] hover:text-[#18201A] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-brand-text mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/services"
                  className="text-brand-text-muted hover:text-[#8CC63F] transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" /> Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-brand-text-muted hover:text-[#8CC63F] transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" /> Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/appointment"
                  className="text-brand-text-muted hover:text-[#8CC63F] transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" /> Book Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-brand-text-muted hover:text-[#8CC63F] transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" /> Pickup History
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold text-brand-text mb-6">
              Contact Info
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4 text-brand-text-muted">
                <div className="w-10 h-10 rounded bg-brand-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#8CC63F]" />
                </div>
                <div>
                  <div className="font-semibold text-brand-text mb-1">
                    Location
                  </div>
                  Agbani Nkanu West, Enugu State
                </div>
              </li>
              <li className="flex items-start gap-4 text-brand-text-muted">
                <div className="w-10 h-10 rounded bg-brand-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#8CC63F]" />
                </div>
                <div>
                  <div className="font-semibold text-brand-text mb-1">
                    Phone
                  </div>
                  <a
                    href="tel:+2348126358899"
                    className="hover:text-[#8CC63F] transition-colors"
                  >
                    +234 812 635 8899
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 text-brand-text-muted">
                <div className="w-10 h-10 rounded bg-brand-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#8CC63F]" />
                </div>
                <div>
                  <div className="font-semibold text-brand-text mb-1">
                    Email
                  </div>
                  <a
                    href="mailto:successejioforchinaza@gmail.com"
                    className="hover:text-[#8CC63F] transition-colors"
                  >
                    successejioforchinaza@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold text-brand-text mb-6">
              Newsletter
            </h4>
            <p className="text-brand-text-muted mb-6">
              Subscribe to our newsletter to get latest updates and eco-tips.
            </p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-brand-primary border border-brand-border rounded py-3 px-4 text-brand-text placeholder:text-brand-text/80 focus:outline-none focus:border-[#8CC63F] transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#8CC63F] text-[#18201A] font-bold py-3 px-4 rounded hover:bg-brand-text hover:text-brand-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Recycle className="w-5 h-5 animate-spin" /> Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe Now <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              {status === "success" && (
                <p className="text-[#8CC63F] text-sm">
                  Successfully subscribed!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-sm">
                  Error subscribing. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-brand-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-text-muted text-sm">
          <div>
            &copy; {new Date().getFullYear()} ecollect. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link
              to="/admin"
              className="hover:text-brand-text transition-colors"
            >
              Admin Portal
            </Link>
            <Link
              to="/privacy"
              className="hover:text-brand-text transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-brand-text transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
