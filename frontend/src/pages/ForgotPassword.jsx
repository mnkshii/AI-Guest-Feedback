import { useState } from "react";
import { Mail, AlertCircle, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    // Temporary UI until email service is added
    setMessage(
      "If an account exists, a password reset link has been sent."
    );
  };


  return (
    <section className="login-container">

      <div className="login-card">

        <h2>Forgot Password?</h2>

        <p>
          Enter your email to reset your password.
        </p>


        {error && (
          <div className="login-error">
            <AlertCircle size={18}/>
            {error}
          </div>
        )}


        {message && (
          <div className="login-success">
            <KeyRound size={18}/>
            {message}
          </div>
        )}


        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>
              <Mail size={16}/>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

          </div>


          <button
            className="btn btn-primary"
            type="submit"
          >
            Send Reset Link
          </button>


        </form>


        <div className="login-footer">

          <p>
            Remember your password?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>


      </div>

    </section>
  );
}


export default ForgotPassword;