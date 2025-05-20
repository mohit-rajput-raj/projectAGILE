import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { TableFooter, Box } from "@mui/material";
import { useAuthStore } from "../Store/AuthStore";
const Logout = () => {
  const {logout,currUser} = useAuthStore();
  const [sec, setSec] = useState(3); 
  const navigate = useNavigate();
  const [rel,setrel] = useState(false);
  useEffect(() => {
    if (sec > 0) {
      setTimeout(() => {
        setSec((prevSec) => prevSec - 1);
      }, 1000); 

    } else {
      
      logout();
      navigate('/login');
      setrel(true);
    }

  }, [navigate,sec]);

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100">
      <HiOutlineLogout className="w-64 h-64 mb-8" />
      {rel ? <h6> You are loged out</h6>:(<h6> Logging you out in {sec}...</h6>)}
      <p className="text-gray-600">Please wait while we securely log you out.</p>
      <Link to={"/login"} className="text-blue-500 mt-4">Return on page</Link>
     
      <TableFooter className="footer">&copy; 2025 MyCollab. All rights reserved.</TableFooter>
    </Box>
  );
};

export default Logout;
