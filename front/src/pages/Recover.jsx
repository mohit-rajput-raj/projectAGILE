import React, { useState } from "react";
import "./style2.css";
import { useAuthStore } from "../Store/AuthStore.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; 
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Typography
} from '@mui/material';
const Recover = () => {
  const { sendOtp, verifOtp } = useAuthStore();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [email, setemail] = useState("");
  const [otpverifi, setOtpVerifi] = useState(false); 
  const [validOTP,setValidOtp] =useState(false);
  const [verifData, setVerifData] = useState({
    otp: "",
    newPassword: "",
  });

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (email) {
      
      sendOtp({email});
      toast.success("Otp sent successfully");
      setShowOtpInput(true);
    } else {
      alert("Please enter your email or phone number first.");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setVerifData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
  
    if (email && verifData.otp && verifData.newPassword) {
      try {
        const res = await verifOtp({ email, otp: verifData.otp, newPassword: verifData.newPassword });
  
        if (res.status === 200) {
          setOtpVerifi(true);
          toast.success(res.msg);
          setValidOtp(false);

        } else {
          setValidOtp(true);
          toast.error(res.data?.msg || " expired OTP");
        }
      } catch (error) {
        console.error( error);
        toast.error("Something went wrong");
      }
    }
  };
  

  return (
    <div className="forgot-container w-screen h-screen">
      <header className="forgot-header flex justify-center">
        <a href="index.html">
          <img src="img/logo.svg" alt="MyCollab Logo" className="logo" />
        </a>
      </header>
      <main className="forgot-main">
        {!otpverifi ? (
          <div className="forgot-box">
            <h2>Forgot Your Password?</h2>
            <p>Please enter your email to reset your password</p>
            <form onSubmit={handleOnSubmit}>
              <div className="form-group">
                <label htmlFor="userIdentifier">Email</label>
                <div className="input-wrapper">
                  <span className="input-icon">&#128100;</span>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="button" className="btn" onClick={handleSendOtp}>
                Send OTP
              </button>

              {showOtpInput && (
                <>
                  <div className="form-group">
                    <label htmlFor="otp" className="flex">Enter OTP {validOTP && (<Typography variant="h6"  color="red">invalid otp</Typography>)}</label>
                    <div className="input-wrapper">
                      <span className="input-icon">&#128274;</span>
                      <input
                        type="text"
                        id="otp"
                        name="otp"
                        placeholder="Enter OTP"
                        value={verifData.otp}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">Enter New Password</label>
                    <div className="input-wrapper">
                      <span className="input-icon">&#128274;</span>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="Enter New Password"
                        value={verifData.newPassword}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn">
                    Verify & Reset Password
                  </button>
                </>
              )}
            </form>

            <div className="forgot-links mt-4">
            <Link to="/login">sign in</Link>
              <span>
                New to MyCollab?
                <Link to="/register">Join now</Link>
              </span>
            </div>
          </div>
        ) : (
          <div className="forgot-box">
            <h2>Password Changed Successfully</h2>
            <CheckCircleIcon style={{ color: "green", fontSize: 50 }} />
            
            <br />
            <Link to="/login">Go to Login</Link>
          </div>
        )}
      </main>
      <footer className="forgot-footer">
        <p>&copy; 2025 MyCollab. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Recover;
