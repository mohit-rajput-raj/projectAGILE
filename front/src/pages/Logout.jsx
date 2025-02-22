import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { TableFooter, Box } from "@mui/material";

const Logout = () => {
  const [sec, setSec] = useState(5); 
  const navigate = useNavigate();

  useEffect(() => {
    if (sec > 0) {
      setTimeout(() => {
        setSec((prevSec) => prevSec - 1);
      }, 1000); 

    } else {
      navigate("/login"); 
    }
  }, [sec, navigate]);

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100">
      <HiOutlineLogout className="w-64 h-64 mb-8" />
      <h1 className="text-3xl font-bold mb-4">Logging you out in {sec}...</h1>
      <p className="text-gray-600">Please wait while we securely log you out.</p>
      <Link to={"/login"} className="text-blue-500 mt-4">Sign In Again</Link>
      <p className="mt-2">
        New to MyCollab? <Link to={"/register"} className="text-blue-500">Join now</Link>
      </p>
      <TableFooter className="footer">&copy; 2025 MyCollab. All rights reserved.</TableFooter>
    </Box>
  );
};

export default Logout;
