import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Recycle, Leaf, Truck, BarChart2 } from "lucide-react";
import { motion } from "motion/react";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: import("react").FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (email && password) {
        if (isLogin) {
          await login(email, password);
          navigate("/");
        } else {
          if (!name) {
            setError("Name is required for sign up");
            setIsLoading(false);
            return;
          }
          await signup(name, email, password);
          navigate("/");
        }
      }
    } catch (err: any) {
      const msg = err.message || "An error occurred during authentication.";
      if (msg.toLowerCase().includes("invalid login credentials")) {
        setError(
          "Invalid login credentials. If you don't have an account, please sign up first.",
        );
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4 md:px-6 lg:px-12 py-12">
      <div className="w-full max-w-4xl lg:max-w-5xl bg-brand-secondary rounded-2xl shadow-2xl border border-brand-border overflow-hidden flex flex-col md:flex-row">
        {/* Left Side (Info Panel) */}
        <div className="hidden md:flex md:w-1/2 bg-[#1a4731] p-10 lg:p-14 flex-col justify-center text-white relative">
          <div className="relative z-10">
            <Recycle className="w-12 h-12 mb-8 text-white" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              ECOLLECT
            </h2>
            <p className="text-lg lg:text-xl text-white/90 mb-12 max-w-sm leading-relaxed">
              Smart waste management for
              <br /> a cleaner tomorrow.
            </p>

            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              <div>
                <Leaf className="w-6 h-6 mb-3 text-white" />
                <div className="text-sm font-medium">
                  Eco-
                  <br />
                  Friendly
                </div>
              </div>
              <div>
                <Truck className="w-6 h-6 mb-3 text-white" />
                <div className="text-sm font-medium">
                  Scheduled
                  <br />
                  Pickups
                </div>
              </div>
              <div>
                <BarChart2 className="w-6 h-6 mb-3 text-white" />
                <div className="text-sm font-medium">
                  Track
                  <br />
                  Impact
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="flex justify-center mb-8 md:hidden">
            <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center">
              <Recycle className="w-8 h-8 text-[#8CC63F]" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-brand-text mb-2 md:text-left text-center">
            {isLogin ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-brand-text-muted mb-8 md:text-left text-center">
            {isLogin
              ? "Enter your credentials to access your account."
              : "Join us to manage your waste smarter."}
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-brand-text mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-primary border border-brand-border rounded py-3 px-4 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-primary border border-brand-border rounded py-3 px-4 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-primary border border-brand-border rounded py-3 px-4 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#8CC63F] text-[#18201A] font-bold py-3.5 px-4 rounded hover:bg-brand-text hover:text-brand-primary transition-colors mt-6 flex items-center justify-center gap-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <>
                  <Recycle className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-8 text-center md:text-left text-brand-text-muted text-sm">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-[#8CC63F] font-semibold hover:text-brand-text transition-colors"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-[#8CC63F] font-semibold hover:text-brand-text transition-colors"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
