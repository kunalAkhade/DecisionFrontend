import React, { useContext, useState } from "react";
import "../css/LoginSignUp.css"; // Import the CSS file for styling
import axios from "axios";
import { AppContext } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useContext(AppContext);
  const [showErr, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic form validation (you can replace with your own logic)
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Call to API for authentication can be done here (e.g., using fetch or axios)
    console.log("API URL:", process.env);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/User/login`,
        {
          username: email,
          password: password,
        }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        navigate("/");
      } else {
        setError(response.data?.message);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 5000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
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
          <button type="submit" className="submit-btn">
            Login
          </button>
          <p>
            Don't have an account? <a href="/sign">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
