import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Info,
  LayoutDashboard,
  BrainCircuit,
  FileBarChart2,
  LogIn,
  FileText, 
} from "lucide-react";

import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <div className="bubbles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <NavLink to="/" className="logo">
          <h1>AI Guest Feedback</h1>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/analysis">AI Analysis</NavLink>
          <NavLink to="/report">Reports</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/reviews">Manage Reviews</NavLink>
        </div>

        <div className="nav-right">
          <ThemeToggle />
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </nav>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={closeSidebar}>
          <X size={24} />
        </button>
        <NavLink to="/" onClick={closeSidebar}>
          <Home size={18} /> Home
        </NavLink>
        <NavLink to="/about" onClick={closeSidebar}>
          <Info size={18} /> About
        </NavLink>
        <NavLink to="/dashboard" onClick={closeSidebar}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink to="/analysis" onClick={closeSidebar}>
          <BrainCircuit size={18} /> AI Analysis
        </NavLink>
        <NavLink to="/report" onClick={closeSidebar}>
          <FileBarChart2 size={18} /> Reports
        </NavLink>
        <NavLink to="/reviews" onClick={closeSidebar}>
          <FileText size={18} /> Manage Reviews
        </NavLink>
        <NavLink to="/login" onClick={closeSidebar}>
          <LogIn size={18} /> Login
        </NavLink>
      </aside>

      <div className={`backdrop ${sidebarOpen ? "show" : ""}`} onClick={closeSidebar} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;