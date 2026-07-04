import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      <Sun
        size={18}
        className={theme === "light" ? "active" : ""}
      />

      <Moon
        size={18}
        className={theme === "dark" ? "active" : ""}
      />

      <div
        className={`toggle-ball ${theme}`}
      />
    </button>
  );
}

export default ThemeToggle;