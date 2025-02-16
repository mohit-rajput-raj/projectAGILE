import React, { useEffect } from "react";
import { useAuthStore } from "../Store/AuthStore";
import { Link } from "react-router-dom";
const Home = () => {
  
  const { logout,getUser, currUser } = useAuthStore();
  useEffect(()=>{
    getUser();
  },[getUser])
  const logoutt=()=>{
    logout();
  }
  return (
    <div>


      <button onClick={logoutt} className="bg-amber-50">logout</button>
      <p>{currUser.email}</p>
      <p>{currUser.role}</p>
      <p>{currUser.phone}</p>
      <p>{currUser.username}</p>
      
      <p>
      <Link className='text-amber-300' to="/dash">dashboard</Link>
        
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima
        repellat vitae at magni vero nihil voluptates molestias iure similique?
        Labore cupiditate saepe nihil architecto nobis sunt sapiente dolores
        magnam dolor!
      </p>
    </div>
  );
};

export default Home;
