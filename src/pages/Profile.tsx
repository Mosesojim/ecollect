import {
  User,
  Settings,
  Shield,
  Award,
  Edit2,
  LogOut,
  Recycle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, FormEvent } from "react";
import { motion } from "motion/react";

export function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFirstName(user.name?.split(" ")[0] || "");
      setLastName(user.name?.split(" ").slice(1).join(" ") || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (
    e: import("react").ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateMessage({ text: "", type: "" });

    try {
      await updateProfile({
        name: `${firstName} ${lastName}`.trim(),
        phone,
        address,
      });
      setUpdateMessage({
        text: "Profile updated successfully!",
        type: "success",
      });
    } catch (error) {
      setUpdateMessage({ text: "Failed to update profile.", type: "error" });
    } finally {
      setIsUpdating(false);
      setTimeout(() => setUpdateMessage({ text: "", type: "" }), 3000);
    }
  };

  return (
    <main className="px-4 md:px-6 lg:px-12 py-12 lg:py-24 max-w-[1600px] mx-auto w-full overflow-x-hidden md:overflow-x-visible">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Profile Sidebar */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-4 xl:col-span-3 space-y-8">
          <div className="bg-brand-secondary rounded p-8 text-center shadow-xl relative">
            <button className="absolute top-4 right-4 text-brand-text-muted hover:text-[#8CC63F] transition-colors">
              <Edit2 className="w-5 h-5" />
            </button>
            <div
              className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#8CC63F]/20 mb-6 relative group cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-medium">Change</span>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <h2 className="text-2xl font-bold text-brand-text mb-1">
              {user.name}
            </h2>
            <p className="text-brand-text-muted mb-6">{user.role}</p>

            <div className="bg-brand-primary rounded p-4 border border-brand-border flex items-center justify-center gap-3">
              <Award className="w-6 h-6 text-[#8CC63F]" />
              <div className="text-left">
                <div className="text-brand-text-muted text-xs font-semibold uppercase tracking-wider">
                  Eco Points
                </div>
                <div className="text-xl font-bold text-brand-text">1,250</div>
              </div>
            </div>
          </div>

          <div className="bg-brand-secondary rounded overflow-hidden shadow-xl">
            <nav className="flex flex-col">
              <button
                onClick={() => setActiveTab("personal")}
                className={`flex items-center gap-3 p-4 font-medium transition-colors border-l-4 text-left w-full ${activeTab === "personal" ? "bg-[#8CC63F]/10 text-[#8CC63F] border-[#8CC63F]" : "text-brand-text-muted hover:bg-brand-text/10 hover:text-brand-text border-transparent"}`}
              >
                <User className="w-5 h-5" />
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 p-4 font-medium transition-colors border-l-4 text-left w-full ${activeTab === "settings" ? "bg-[#8CC63F]/10 text-[#8CC63F] border-[#8CC63F]" : "text-brand-text-muted hover:bg-brand-text/10 hover:text-brand-text border-transparent"}`}
              >
                <Settings className="w-5 h-5" />
                Account Settings
              </button>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`flex items-center gap-3 p-4 font-medium transition-colors border-l-4 text-left w-full ${activeTab === "privacy" ? "bg-[#8CC63F]/10 text-[#8CC63F] border-[#8CC63F]" : "text-brand-text-muted hover:bg-brand-text/10 hover:text-brand-text border-transparent"}`}
              >
                <Shield className="w-5 h-5" />
                Privacy & Security
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-4 text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors border-l-4 border-transparent text-left w-full font-medium"
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </button>
            </nav>
          </div>
        </motion.div>
        {/* Profile Content */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-8 xl:col-span-9 bg-brand-secondary rounded p-8 lg:p-12 shadow-xl">
          {activeTab === "personal" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            
              <h3 className="text-2xl font-bold text-brand-text mb-8 border-b border-brand-border pb-4">
                Personal Information
              </h3>

              <form className="space-y-8" onSubmit={handleUpdateProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-transparent border-b border-brand-border py-3 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-transparent border-b border-brand-border py-3 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    disabled
                    className="w-full bg-transparent border-b border-brand-border py-3 text-brand-text/50 focus:outline-none focus:border-[#8CC63F] transition-colors cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full bg-transparent border-b border-brand-border py-3 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your residential address"
                    className="w-full bg-transparent border-b border-brand-border py-3 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
                  />
                </div>

                <div className="pt-6 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-[#8CC63F] text-[#18201A] font-bold px-8 py-4 rounded hover:bg-brand-text hover:text-brand-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUpdating ? (
                      <>
                        <Recycle className="w-5 h-5 animate-spin" /> Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  {updateMessage.text && (
                    <span
                      className={`text-sm ${updateMessage.type === "success" ? "text-[#8CC63F]" : "text-red-500"}`}
                    >
                      {updateMessage.text}
                    </span>
                  )}
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            
              <h3 className="text-2xl font-bold text-brand-text mb-8 border-b border-brand-border pb-4">
                Account Settings
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-brand-primary rounded border border-brand-border">
                  <div>
                    <h4 className="text-brand-text font-medium mb-1">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-brand-text-muted">
                      Receive updates about your pickups and eco-points.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-brand-text/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8CC63F]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-brand-primary rounded border border-brand-border">
                  <div>
                    <h4 className="text-brand-text font-medium mb-1">
                      SMS Alerts
                    </h4>
                    <p className="text-sm text-brand-text-muted">
                      Get text messages when our driver is nearby.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-brand-text/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8CC63F]"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "privacy" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            
              <h3 className="text-2xl font-bold text-brand-text mb-8 border-b border-brand-border pb-4">
                Privacy & Security
              </h3>
              <form className="space-y-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-transparent border-b border-brand-border py-3 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-transparent border-b border-brand-border py-3 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-transparent border-b border-brand-border py-3 text-brand-text focus:outline-none focus:border-[#8CC63F] transition-colors"
                  />
                </div>
                <div className="pt-6">
                  <button
                    type="button"
                    className="bg-[#8CC63F] text-[#18201A] font-bold px-8 py-4 rounded hover:bg-brand-text hover:text-brand-primary transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
