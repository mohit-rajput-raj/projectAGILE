import React, { useState } from "react";
import "./style.css";
import { useAuthStore } from "../Store/AuthStore";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Sign = () => {
  const { register } = useAuthStore();
  const [regdata, setregdata] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
    role: "",
  });

  const handelChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setregdata((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handelSumbit = async (e) => {
    e.preventDefault();
    if (regdata.password !== regdata.confirmPassword) {
      alert("Password does not match");
      return;
    }
    register(regdata);
  };

  return (
    <div className="container w-screen h-screen">
      <header className="flex justify-center">
        <h1>MyCollab</h1>
      </header>
      <main className="form-container">
        <form id="registerForm" onSubmit={handelSumbit} className="form animate-fadeIn">
          <h2>Register</h2>

          <label htmlFor="regEmail">Email</label>
          <input
            type="email"
            id="regEmail"
            name="email"
            value={regdata.email}
            onChange={handelChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="regusername"
            name="username"
            value={regdata.username}
            onChange={handelChange}
            placeholder="Enter your username"
            required
          />

          <label htmlFor="regPassword">Password</label>
          <input
            type="password"
            id="regPassword"
            name="password"
            value={regdata.password}
            onChange={handelChange}
            placeholder="Create a password"
            required
          />

          <label htmlFor="regConfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="regConfirmPassword"
            name="confirmPassword"
            value={regdata.confirmPassword}
            onChange={handelChange}
            placeholder="Confirm your password"
            required
          />

          <label htmlFor="regPhone">Phone Number</label>
          <PhoneInput
            country={"in"}
            // enableSearch={true}
            value={regdata.phone}
            name="phone"
            onChange={(phone) => setregdata((data) => ({ ...data, phone }))} 
          />

          <label htmlFor="regRole">Select Your Role</label>
          <select id="regRole" required name="role" value={regdata.role} onChange={handelChange}>
            <option value="">Choose Role</option>
            <option value="homemaker">Home-Maker</option>
            <option value="shopowner">Shop Owner</option>
          </select>

          <div className="links">
            <Link to="/dash">Dashboard</Link>
            <Link to="/login">Already have an account?</Link>
          </div>

          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </main>
      <footer className="footer">
        <p>&copy; 2025 MyCollab. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Sign;
