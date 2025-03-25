import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/AuthStore";

const Login = () => {
  const { login,loginError ,isLogin} = useAuthStore();
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
  useEffect(()=>{
    if(loginError){
      alert(loginError);
    }
  },[loginError])

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(logindata);
      

    } catch (error) {
      console.log(error);
      
    }
    setLogindata({
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="container ">
        <header className="header">
          <h1>MyCollab</h1>
        </header>
        <div className="flex">
        <main className="form-container flex justify-center w-screen">
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

            <button type="submit" className="btn ">
              Login
            </button>

            <div className="links flex justify-between">
              <Link to="/recover">Forgot password?</Link>
              <Link to="/register">Don't have an account?</Link>
            </div>
          </form>
        </main>
        <div className="image-container">
            <div>
              {/* <h1>HEY YOUR WELCOME</h1> */}
              
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, beatae.</p>
            <div className="image"></div>
            </div>
          </div>
          </div>
        <footer className="footer">
          <p>&copy; 2025 MyCollab. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
