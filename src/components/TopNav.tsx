import {
  Recycle,
  User,
  Menu,
  X,
  Clock,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  LogOut,
  LogIn,
  
  
} from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";


export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
    
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(
        now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }) + 
        " " + 
        now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <>
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Top Utility Bar */}
      <div className="hidden lg:flex justify-between items-center px-4 lg:px-6 xl:px-12 py-2.5 bg-brand-primary border-b border-brand-border text-brand-text-muted text-xs font-medium tracking-wide">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#8CC63F]" /> {currentDateTime}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#8CC63F]" /> Agbani Nkanu West, Enugu State
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#8CC63F]" /> +234 812 635 8899
          </div>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-brand-text transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="hover:text-brand-text transition-colors">
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.974H5.078z" />
            </svg>
          </a>
          <a href="#" className="hover:text-brand-text transition-colors">
            <Youtube className="w-4 h-4" />
          </a>
          <a href="#" className="hover:text-brand-text transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-brand-secondary border-b border-brand-border py-4 px-4 lg:px-6 xl:px-12 flex justify-between items-center ">
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <Recycle className="w-8 h-8 text-[#8CC63F]" />
          <span className="text-2xl font-bold tracking-tight text-brand-text">
            ecollect<span className="text-[#8CC63F]">.</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-4 xl:gap-10 text-brand-text-muted font-medium text-xs xl:text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[#8CC63F]"
                : "text-brand-text hover:text-[#8CC63F] transition-colors"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-[#8CC63F]"
                : "text-brand-text hover:text-[#8CC63F] transition-colors"
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              isActive
                ? "text-[#8CC63F]"
                : "text-brand-text hover:text-[#8CC63F] transition-colors"
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive
                ? "text-[#8CC63F]"
                : "text-brand-text hover:text-[#8CC63F] transition-colors"
            }
          >
            History
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-[#8CC63F]"
                : "text-brand-text hover:text-[#8CC63F] transition-colors"
            }
          >
            Profile
          </NavLink>
        </div>

        <div className="hidden lg:flex items-center gap-3 xl:gap-6">
                    <Link
            to="/appointment"
            className="bg-[#8CC63F] text-[#18201A] font-bold px-4 xl:px-6 py-2 xl:py-2.5 rounded-full hover:bg-white hover:text-brand-primary transition-all text-xs xl:text-sm whitespace-nowrap"
          >
            Schedule Pickup
          </Link>
                    

          {user ? (
            <>
              <div className="text-right hidden xl:block">
                <div className="text-sm font-semibold text-brand-text">
                  {user.name}
                </div>
                <div className="text-xs text-[#8CC63F]">{user.role}</div>
              </div>
              <Link
                to="/profile"
                className="bg-[#8CC63F] p-2 xl:p-2.5 rounded text-[#18201A] hover:bg-brand-text hover:text-brand-primary transition-all font-bold flex items-center gap-1 xl:gap-2 text-xs xl:text-sm px-3 xl:px-5 whitespace-nowrap"
              >
                <User className="w-4 h-4" />
                <span>Account</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-brand-text-muted hover:text-brand-text transition-colors bg-brand-text/10 p-2 xl:p-2.5 rounded"
                title="Log Out"
              >
                <LogOut className="w-4 h-4 xl:w-5 xl:h-5" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-[#8CC63F] p-2 xl:p-2.5 rounded text-[#18201A] hover:bg-brand-text hover:text-brand-primary transition-all font-bold flex items-center gap-1 xl:gap-2 text-xs xl:text-sm px-3 xl:px-5 whitespace-nowrap"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          
                    <button
            className="text-brand-text p-2 -mr-2"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
    </header>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
          />
          <div className="w-72 bg-brand-secondary h-full relative flex flex-col shadow-2xl ml-auto animate-in slide-in-from-right duration-200">
            <div className="p-4 md:p-6 border-b border-brand-border flex justify-between items-center bg-brand-primary">
              <span className="text-xl font-bold text-brand-text">Menu</span>
              <button
                onClick={closeMenu}
                className="text-brand-text-muted hover:text-brand-text transition-colors bg-brand-text/10 p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col px-4 md:px-6 py-2 md:py-4 gap-2 md:gap-4 font-medium text-lg overflow-y-auto no-scrollbar">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#8CC63F]"
                    : "text-brand-text-muted hover:text-brand-text transition-colors"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/services"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#8CC63F]"
                    : "text-brand-text-muted hover:text-brand-text transition-colors"
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/pricing"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#8CC63F]"
                    : "text-brand-text-muted hover:text-brand-text transition-colors"
                }
              >
                Pricing
              </NavLink>
              <NavLink
                to="/appointment"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#8CC63F]"
                    : "text-brand-text-muted hover:text-brand-text transition-colors"
                }
              >
                Appointment
              </NavLink>
              <NavLink
                to="/history"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#8CC63F]"
                    : "text-brand-text-muted hover:text-brand-text transition-colors"
                }
              >
                History
              </NavLink>
              <NavLink
                to="/profile"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#8CC63F]"
                    : "text-brand-text-muted hover:text-brand-text transition-colors"
                }
              >
                Profile
              </NavLink>
            </div>

            {user ? (
              <div className="mt-auto p-6 border-t border-brand-border bg-brand-primary flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#8CC63F] flex items-center justify-center text-[#18201A] shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-base font-bold text-brand-text truncate">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-[#8CC63F]">
                      {user.role}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-brand-text-muted hover:text-brand-text transition-colors bg-brand-text/10 p-2.5 rounded"
                  title="Log Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="mt-auto p-6 border-t border-brand-border bg-brand-primary">
                <Link
                  to="/appointment"
                  onClick={closeMenu}
                  className="w-full bg-[#8CC63F] p-3 rounded-full text-[#18201A] hover:bg-brand-text hover:text-brand-primary transition-all font-bold flex items-center justify-center gap-2 text-base mb-3"
                >
                  <span>Schedule Pickup</span>
                </Link>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="w-full bg-brand-secondary border border-brand-border p-3 rounded-full text-brand-text hover:bg-brand-text hover:text-brand-primary transition-all font-bold flex items-center justify-center gap-2 text-base"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
