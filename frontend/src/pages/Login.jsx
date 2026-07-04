import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Temporary login until backend authentication is ready
    if (email === "demo@example.com" && password === "password") {
      alert("Login Successful!");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials.");
    }
  };

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

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>
              <Mail size={16 }   />
               Email
            </label>

            <input
              type="email"
              placeholder="demo@example.com"
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

        </form>

        <div className="login-footer">

          <p>
            Demo Login:
          </p>

          <p>
            <strong>Email:</strong> demo@example.com
          </p>

          <p>
            <strong>Password:</strong> password
          </p>

          <br />

          <p>
            Register and Forgot Password pages will be added
            after backend authentication is completed.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Login;