import React, { useEffect, useState } from "react";
import { useAuthStore } from "../Store/AuthStore";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import "../coustomStyles/Nav.css";
// import 
export const menu1 = [
  { name: "DashBoard", rout: "/dashboard" },
  // { name: "Items", rout: "/dashboard/items" },
  
  { name: "Contacts", rout: "/dashboard/contacts" },
  { name: "FeedBack", rout: "/dashboard/issues" },
  { name: "Report", rout: "/dashboard/report" },
  { name: "HIstory", rout: "/dashboard/history" },
  // { name: "Cancled", rout: "/dashboard/cancled" },
  { name: "Favourites", rout: "/dashboard/favourites" },
];
import notP from "./user.jpg";
import { useDashBoardStore } from "../Store/dashBoardStore";
import {
  FaHome,
  FaBell,
  FaUser,
  FaEnvelope,
  FaAddressBook,
  FaSignOutAlt,
} from "react-icons/fa";
import "../components/ove.css";
import { useNotificationStore } from "../Store/notificationStore";
export const menu2 = [
  { name: "DashBoard", rout: "/dashboard" },
  // { name: "Items", rout: "/dashboard/items" },
  // { name: "Collaboration", rout: "/dashboard/colabration" },
  { name: "Contacts", rout: "/dashboard/contacts" },
  // { name: "FeedBack", rout: "/dashboard/issues" },
  // { name: "Menu", rout: "/dashboard/menu" },
  // { name: "HIstory", rout: "/dashboard/history" },
  // { name: "Cancled", rout: "/dashboard/cancled" },
  { name: "Favourites", rout: "/dashboard/favourites" },
];
const NAV = () => {
  const { getUnreadNotifications,unreadNotifications,unreadNotificationsLoading } = useNotificationStore();
  const {getDeployedOrdersForMaker,DeployedOrdersForMaker,getDeployedOrdersForMakerLoading}  = useDashBoardStore();
  const [re, setRe ] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const location = useLocation();
  const handelOver = () => {
    setOverlay(!overlay);
  };
  
  const { logout, getUser, currUser } = useAuthStore();
 
  const navigate = useNavigate();
  const [menu , setMenu] = useState(null);
  useEffect(() => {
    getUnreadNotifications();
  }, [getUnreadNotifications,re]);
  
  const handelMenu = ()=>{
    if(currUser?.profile?.role==="homemaker"){
      return true;
    }else if(currUser?.profile?.role==="shopowner"){
      return false;
    }
  }
  
  const [profileDrop, setProDrop] = useState(false);
  

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      <nav className="fixed top-0 left-0 right-0 bg-[#131921] text-white shadow-lg z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between  h-16 w-screen">
            <div className="flex items-center w-1/2">
            <button
              onClick={() =>{ navigate("/home");setRe(!re)}}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <FaHome className="w-6 h-6" />
            </button>
            {location.pathname.startsWith("/dashboard") && (
              <div className="dLeft ">
                {/* <div className="dLeftTop center ">someItems</div> */}
                <div className="dLeftBottom trdcard">
                  {handelMenu? (menu2.map((itm, i) => (
                    <div key={i}>
                      <div className={`menuItems1 center `}   onClick={() => {navigate(itm.rout);setRe(!re)}}>{itm.name}</div>
                      <hr />
                    </div>
                  ))) :  (menu1.map((itm, i) => (
                    <div key={i}>
                      <div className={`menuItems1 center `}   onClick={() =>{ navigate(itm.rout);setRe(!re)}}>{itm.name}</div>
                      <hr />
                    </div>
                  )))}
                </div>
              </div>
              )}
            </div>
            {/* <div className="flex-grow  mx-4">
              <span className="text-lg font-semibold">
                
              </span>
            </div> */}
            {/* <div className="w-110"></div> */}
            <div className="flex items-end space-x-2 mr-12 mr-0">
            <button
                onClick={() =>{ navigate("/home");setRe(!re)}}
                className="flex items-center px-3 py-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <FaHome className="w-6 h-6" />
                <span className="hidden md:inline">Home</span>
              </button>
              <button
                onClick={() => {navigate("/notification");setRe(!re);}}
                className="flex items-center px-3 py-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <FaBell className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">Notifications</span>
                {unreadNotifications?.total > 0 && (
                  <span className="bg-red-500 w-4 h-4 text-white center text-xs rounded-full px-2 py-1 relative -top-1">
                    {unreadNotifications?.total}
                  </span>
                )}
              </button>

              <button
                onClick={() => {navigate("/profile/" + currUser?.username);setRe(!re)}}
                className="flex items-center px-3 py-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <FaUser className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">Profile</span>
              </button>

              <button
                onClick={() =>{ navigate("/dashboard");setRe(!re);}}
                className="flex items-center px-3 py-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <FaUser className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">Dashboard</span>
              </button>

              <button
                onClick={() =>{ navigate("/messages");setRe(!re)}}
                className="flex items-center px-3 py-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <FaEnvelope className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">Messages</span>
              </button>

              

              <div
                className="p-but w-13 h-13"
                onMouseOver={() => setProDrop(true)}
                onMouseOut={() => setProDrop(false)}
              >
                {currUser?.profile.pic ? (
                  <img
                    src={currUser.profile.pic}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full "
                  />
                ) : (
                  <img src={notP} alt="Profile" className="profile-image" />
                )}
                {profileDrop && (
                  <>
                    <div className="pdropCon" onMouseOver={() => setProDrop(true)}>
                    <div className="pdrop" >
                      <div className="flex justify-center items-center optn">
                      <a onClick={()=>{navigate("/profile/" + currUser?.username);setRe(!re)}} className="logoutb">view profile</a>
                      </div>
                      <hr />
                      <div className="flex justify-center items-center optn">
                      <a onClick={()=>navigate('/completep')} className="logoutb">complete profile</a>
                      </div>
                      <hr />
                      <div className="flex justify-center items-center optn">
                       <a onClick={handelOver} className="logoutb ">logout</a>
                      </div>
                      <hr />
                      
                    </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main
        className="pt-16 min-h-screen w-screen"
        style={{ paddingTop: "70px" }}
      >
        {overlay ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center backest w-screen h-screen">
              <div className="w-screen h-screen testBack">
                <div className="testCard">
                  <div className="flex h-1/5 w-1/1 justify-end">
                    <button className="logout text-6xl " onClick={handelOver}>
                      X
                    </button>
                  </div>
                  <div className="flex justify-center items-center w-1/1 h-1/5">
                    <p className="text-2xl">are u want to logout</p>
                  </div>

                  <div className="flex justify-center items-center h-3/5 w-1/1">
                    <button className="logout" onClick={handleLogout}>
                      yes
                    </button>
                    <button className="nott" onClick={handelOver}>
                      no
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container  w-screen ">
              <Outlet />
            </div>
          </>
        )}
      </main>
    </div>
  );
};
import { LuLayoutDashboard } from "react-icons/lu";
import { MdReportProblem } from "react-icons/md";
const NAVadmin = () => {
  const [overlay, setOverlay] = useState(false);
  const location = useLocation();
  const handelOver = () => {
    setOverlay(!overlay);
  };
  const { logout, currUser } = useAuthStore();
  const navigate = useNavigate();
  
  
 
  
  const [profileDrop, setProDrop] = useState(false);
  

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      <nav className="fixed top-0 left-0 right-0 bg-[#131921] text-white shadow-lg z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between  h-16 w-screen">
            <div className="flex items-center w-1/2">
              <button
                onClick={() =>{ navigate("/");s}}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <FaHome className="w-6 h-6" />
              </button>
            
            </div>
            <h3>{currUser.email}</h3>
            <div className="flex items-end space-x-2 mr-12 mr-0">
            <button
                onClick={() =>{ navigate("/reports");}}
                className="flex items-center px-3 py-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <MdReportProblem className="w-6 h-6" />
                <span className="hidden md:inline">Reports</span>
              </button>
              

              

              <button
                onClick={() =>{ navigate("/adminBoard");}}
                className="flex items-center px-3 py-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <LuLayoutDashboard className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">Dashboard</span>
              </button>

              

         

              <div
                className="p-but w-13 h-13"
                onMouseOver={() => setProDrop(true)}
                onMouseOut={() => setProDrop(false)}
              >
                {currUser?.profile.pic ? (
                  <img
                    src={currUser.profile.pic}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full "
                  />
                ) : (
                  <img src={notP} alt="Profile" className="profile-image" />
                )}
                {profileDrop && (
                  <>
                    <div className="pdropCon" onMouseOver={() => setProDrop(true)}>
                    <div className="pdrop" >
                      <div className="flex justify-center items-center optn">
                      <a onClick={()=>{navigate("/profile/" + currUser?.username);setRe(!re)}} className="logoutb">view profile</a>
                      </div>
                      <hr />
                      <div className="flex justify-center items-center optn">
                      <a onClick={()=>navigate('/completep')} className="logoutb">complete profile</a>
                      </div>
                      <hr />
                      <div className="flex justify-center items-center optn">
                       <a onClick={handelOver} className="logoutb ">logout</a>
                      </div>
                      <hr />
                      
                    </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main
        className="pt-16 min-h-screen w-screen"
        style={{ paddingTop: "70px" }}
      >
        {overlay ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center backest w-screen h-screen">
              <div className="w-screen h-screen testBack">
                <div className="testCard">
                  <div className="flex h-1/5 w-1/1 justify-end">
                    <button className="logout text-6xl " onClick={handelOver}>
                      X
                    </button>
                  </div>
                  <div className="flex justify-center items-center w-1/1 h-1/5">
                    <p className="text-2xl">are u want to logout</p>
                  </div>

                  <div className="flex justify-center items-center h-3/5 w-1/1">
                    <button className="logout" onClick={handleLogout}>
                      yes
                    </button>
                    <button className="nott" onClick={handelOver}>
                      no
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container  w-screen ">
              <Outlet />
            </div>
          </>
        )}
      </main>
    </div>
  );
};
export  {NAV,NAVadmin};
