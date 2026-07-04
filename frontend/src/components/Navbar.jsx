import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <h2 className="logo">AI Feedback</h2>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/about" onClick={() => setMenuOpen(false)}>
          About
        </Link>

        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>

        <Link to="/reviews" onClick={() => setMenuOpen(false)}>
          Manage Reviews
        </Link>

        <Link to="/analysis" onClick={() => setMenuOpen(false)}>
          AI Analysis
        </Link>

        <Link to="/report" onClick={() => setMenuOpen(false)}>
          Report
        </Link>

        <Link to="/login" onClick={() => setMenuOpen(false)}>
          Login
        </Link>
      </div>

      <div className="nav-actions">
        <ThemeToggle />

        <button className="btn btn-primary">
          Get Started
        </button>

        <div
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        ></div>
      </div>
    </nav>
  );
}

export default Navbar;