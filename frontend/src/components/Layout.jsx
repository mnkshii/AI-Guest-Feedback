// src/components/Layout.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Close menu after clicking a link
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <h1><i className="fas fa-cube"></i> AI Guest Feedback Analyzer</h1>
        </div>
        <button
          className="hamburger"
          ref={hamburgerRef}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>MENU</span>
        </button>
      </nav>

      {/* Dropdown menu (three‑lines) */}
      {menuOpen && (
        <div className="nav-menu" ref={menuRef}>
          <ul>
            <li><Link to="/" onClick={handleLinkClick}><i className="fas fa-home"></i> Home</Link></li>
            <li><Link to="/about" onClick={handleLinkClick}><i className="fas fa-info-circle"></i> About</Link></li>
            <li><Link to="/dashboard" onClick={handleLinkClick}><i className="fas fa-chart-line"></i> Dashboard</Link></li>
            <li><Link to="/login" onClick={handleLinkClick}><i className="fas fa-sign-in-alt"></i> Login</Link></li>
          </ul>
        </div>
      )}

      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        <p>© AI Guest Feedback Analyzer. All rights reserved.</p>
        <p style={{ marginTop: '8px', fontSize: '0.75rem' }}>
          
        </p>
      </footer>
    </>
  );
};

export default Layout;