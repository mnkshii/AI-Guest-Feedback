import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Check if user is already logged in
  const token = localStorage.getItem("token");
  const storedEmail = localStorage.getItem("email");
  const isLoggedIn = !!token;
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  navigate("/login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

   try {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    setError(data.message || "Login failed.");
    return;
  }

  // Save JWT
  localStorage.setItem("token", data.token);
  localStorage.setItem("email", email);
  alert("Login Successful!");

  navigate("/dashboard");

} catch (error) {
  setError("Server error. Please try again.");
}
  };
// If already logged in, show this instead
if (isLoggedIn) {
  return (
    <section className="login-container">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>You are already logged in as:</p>
        <p><strong>{storedEmail}</strong></p>
        <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
  return (
    <section className="login-container">

      <div className="login-card">

        <h2>Welcome Back </h2>

        <p>
          Login to access your AI Guest Feedback Dashboard.
        </p>

        {error && (
          <div className="login-error">
            <AlertCircle size={18} />
            {error}
          </div>
        )}
        {/* Google OAuth Button */}
<div style={{ marginBottom: "20px" }}>
  <a
    href="http://localhost:5000/api/auth/google"
    className="btn google-btn"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      width: "100%",
      padding: "12px",
      borderRadius: "12px",
      background: "#ffffff",
      color: "#333",
      border: "1px solid #ddd",
      textDecoration: "none",
      fontWeight: "600",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.target.style.background = "#f5f5f5";
      e.target.style.borderColor = "#bbb";
    }}
    onMouseLeave={(e) => {
      e.target.style.background = "#ffffff";
      e.target.style.borderColor = "#ddd";
    }}
  >
    <img
      src="https://www.google.com/favicon.ico"
      alt="Google"
      style={{ width: "20px", height: "20px" }}
    />
    Sign in with Google
  </a>
</div>

{/* Divider */}
<div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
  <hr style={{ flex: 1, border: "none", borderTop: "1px solid var(--border)" }} />
  <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>OR</span>
  <hr style={{ flex: 1, border: "none", borderTop: "1px solid var(--border)" }} />
</div>
        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>
              <Mail size={16 }   />
               Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>
              <Lock size={18} />
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <button
            className="btn btn-primary"
            type="submit"
          >
            <LogIn size={18} />
            &nbsp;Sign In
          </button>
          <p style={{ marginTop: "20px" }}>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
          </p>

          <p style={{ marginTop: "10px" }}>
          <Link to="/forgot-password">
           Forgot Password?
          </Link>
          </p>
        </form>

        <div className="login-footer">
        <p>Sign in using your registered account.</p>
        </div>

      </div>

    </section>
  );
}

export default Login;