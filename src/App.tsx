import { BrowserRouter as Router } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { TopNav } from "./components/TopNav";
import { Footer } from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { AnimatedRoutes } from "./components/AnimatedRoutes";

export default function App() {
  return (
    <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-brand-primary font-sans text-brand-text selection:bg-[#8CC63F] selection:text-brand-primary overflow-x-clip">
            <TopNav />
            <div className="flex-1 flex flex-col">
              <AnimatedRoutes />
            </div>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
  );
}
