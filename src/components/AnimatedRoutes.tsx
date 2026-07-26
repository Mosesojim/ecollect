import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Dashboard } from "../pages/Dashboard";
import { Services } from "../pages/Services";
import { Appointment } from "../pages/Appointment";
import { History } from "../pages/History";
import { Profile } from "../pages/Profile";
import { Pricing } from "../pages/Pricing";
import { Terms } from "../pages/Terms";
import { Privacy } from "../pages/Privacy";
import { Login } from "../pages/Login";
import { AdminPickups } from "../pages/AdminPickups";
import { PageTransition } from "./PageTransition";

export function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error key is used for AnimatePresence */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/appointment" element={<PageTransition><Appointment /></PageTransition>} />
        <Route path="/history" element={<PageTransition><History /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminPickups /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}
