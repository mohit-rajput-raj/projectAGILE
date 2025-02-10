import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../Store/AuthStore";

const Login = () => {
  const { login } = useAuthStore();
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogindata((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(logindata);
    setLogindata({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="container">
        <header className="header">
          <h1>MyCollab</h1>
        </header>
        <main className="form-container">
          <form
            id="loginForm"
            className="form animate-fadeIn"
            onSubmit={handleSubmit}
          >
            <h2>Login</h2>

            <label htmlFor="loginEmail">Email</label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              placeholder="Enter your email"
              value={logindata.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              placeholder="Enter your password"
              value={logindata.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn">
              Login
            </button>

            <div className="links flex justify-between">
              <Link to="/recover">Forgot password?</Link>
              <Link to="/register">Don't have an account?</Link>
            </div>
          </form>
        </main>
        <footer className="footer">
          <p>&copy; 2023 MyCollab. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
