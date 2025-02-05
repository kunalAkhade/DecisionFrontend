import React, { useState } from "react";
import "../css/LoginSignUp.css"; // Import the CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showErr, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      setShow(true);
      setTimeout(() => setShow(false), 5000);
      return;
    }
    if (password !== confirmPassword) {
      setShow(true);
      setError("Passwords do not match.");
      setTimeout(() => {
        setShow(false);
      }, 5000);
      return;
    }

    // Call to API for creating an account can be done here

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/User/register`,
        {
          username: email,
          password: password,
        }
      );

      if (response?.data?.data != null) {
        navigate("/loginpage");
      } else {
        setError(response?.data?.message);
        setShow(true);
      }
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => setShow(false), 5000);
    console.log("Sign Up:", { email, password });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        {error && showErr ? <p className="error">{error}</p> : <></>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Username:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Sign Up
          </button>

          <p>
            Already have an account? <a href="/loginpage">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
