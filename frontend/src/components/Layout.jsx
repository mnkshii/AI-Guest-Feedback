import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // global theme (if needed elsewhere)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && sidebarOpen) closeSidebar();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [sidebarOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h1><i className="fas fa-cube"></i>AI Guest Feedback</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Theme toggle – inline inside navbar */}
          <ThemeToggle />
          <button className="hamburger" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>MENU</span>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={closeSidebar}><i className="fas fa-home"></i> Home</Link></li>
          <li><Link to="/about" onClick={closeSidebar}><i className="fas fa-info-circle"></i> About</Link></li>
          <li><Link to="/dashboard" onClick={closeSidebar}><i className="fas fa-chart-line"></i> Dashboard</Link></li>
          <li><Link to="/analysis" onClick={closeSidebar}><i className="fas fa-robot"></i> AI Analysis</Link></li>
          <li><Link to="/report" onClick={closeSidebar}><i className="fas fa-file-alt"></i> Report</Link></li>
          <li><Link to="/login" onClick={closeSidebar}><i className="fas fa-sign-in-alt"></i> Login</Link></li>
        </ul>
      </div>

      {/* Backdrop */}
      <div className={`backdrop ${sidebarOpen ? 'show' : ''}`} onClick={closeSidebar}></div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;