import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
  LogOut,
  User,
} from "lucide-react";

import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";

function Layout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
    closeSidebar();
  };

  return (
    <>
      <div className="bubbles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navbar - Only Logo, ThemeToggle, and Hamburger */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <NavLink to="/" className="logo">
          <h1>AI Guest Feedback</h1>
        </NavLink>

        <div className="nav-right">
          <ThemeToggle />
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div className={`backdrop ${sidebarOpen ? "show" : ""}`} onClick={closeSidebar} />

      {/* Sidebar - All navigation + Auth goes here */}
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

        {/* Auth links in sidebar */}
        {!token ? (
          <>
            <NavLink to="/login" onClick={closeSidebar}>
              <LogIn size={18} /> Login
            </NavLink>
            <NavLink to="/register" onClick={closeSidebar}>
              <LogIn size={18} /> Register
            </NavLink>
          </>
        ) : (
          <>
            <div className="sidebar-user">
              <User size={18 } />
              {email}
            </div>
            <button onClick={handleLogout} className="sidebar-logout">
              <LogOut size={18} /> Logout
            </button>
          </>
        )}
      </aside>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;