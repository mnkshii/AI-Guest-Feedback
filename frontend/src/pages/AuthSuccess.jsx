import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        localStorage.setItem("email", payload.email);
      } catch (e) {
        console.log("Could not decode token");
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <section className="login-container">
      <div className="login-card">
        <h2>🔄 Logging you in...</h2>
        <p>Please wait while we complete your Google sign-in.</p>
        <div style={{ marginTop: "20px" }}>
          <div className="loading-spinner"></div>
        </div>
      </div>
    </section>
  );
}

export default AuthSuccess;