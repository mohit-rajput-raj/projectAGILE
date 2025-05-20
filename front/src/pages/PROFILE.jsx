import React, { useState, useEffect, useCallback, useRef } from "react";
import "../coustomStyles/profile.css";
import "../coustomStyles/container.css";
import banner from "../coustomStyles/images/banner.jpg";
import banner2 from "../coustomStyles/images/banner2.jpg";
import banner3 from "../coustomStyles/images/banner3.jpg";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import dummyBanner from "../coustomStyles/images/image.png";
// import banner4 from '../coustomStyles/banner4.jpg'
import black from "./black.tree.jpg";
import { MdOutlineModeEdit } from "react-icons/md";
import Suggestions from "./Suggestions";
import "../coustomStyles/person.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineVerified } from "react-icons/md";
import userPic from "./user.jpg";
import '../coustomStyles/NAV.css'
import { useDashBoardStore } from "../Store/dashBoardStore";
import { useAuthStore } from "../Store/AuthStore";
import { useHomeStore } from "../Store/homeStore";
import { useConnectStore } from "../Store/ConnectStore.js";
const banners = [banner, banner2, banner3, banner2];
const images = banners;
import {LinkedinFeed} from '../skeletons/profileSkeleton.jsx'
import { useUsersData } from "../Store/dataStore";
import { MdOutlineReportProblem } from "react-icons/md";
const Profile = () => {
  const { getConnections, connections } = useDashBoardStore();
  const {
    sendFollowRequest,
    sendUnfollowRequest,
    isFollowing,
    isFollowingLoading,
    getIsFollowing,
    ToggleFollowingLoading,
    sendConnectionRequest,
    isInConnections,
    inConnection,
    connectionRequestsLoading
    
    
  } = useConnectStore();
  const {
    
    addContact,
    isInContacts,
    contactsSaved,
    isInContactsLoading,
    removeContact,
    removingFromContacts,
    addingContacts,
    doReport

  } = useHomeStore();
  
  useEffect(()=>{
    if(userProfile){
      getIsFollowing(userProfile?._id);
    }
    
  },[getIsFollowing]);

 const [incon , setIncon] = useState(inConnection);
 const [inFol , setInFol] = useState(isFollowing);
 
  
  useEffect(() => {
    isInConnections(userProfile?._id);
  }, [inConnection,sendConnectionRequest]);
  const handelRemoveconnect = async () => {
    try {
      await sendConnectionRequest(userProfile?._id);
      setIncon(false);
      setTotalConnections(prev => prev - 1);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };
  const handeladdConnection = async () => {
    try {
      await sendConnectionRequest(userProfile?._id);
      setIncon(true);
      setTotalConnections(prev => prev + 1);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };
  const username = useParams().username;

  const { userProfile, getUserProfile, isUserProfileLoading } = useUsersData();
  const [reportOverlay , setReportOverlay] = useState(false);
  
  useEffect(() => {
    getUserProfile(username);
  }, [getUserProfile]);

  
  useEffect(() => {
    isInContacts(userProfile?._id);
  }, [isInContacts, removingFromContacts, addingContacts]);
  const handelRemovecontact = async () => {
    try {
      await removeContact(userProfile?._id);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };
  const addContactHandler = async () => {
    try {
      await addContact(userProfile?._id);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };
  const { currUser } = useAuthStore();

  const navigate = useNavigate();

  const isOwnProfile = currUser?._id === userProfile?._id;
  const userData = isOwnProfile ? currUser : userProfile;
  
  const [totalConnections, setTotalConnections] = useState(userData?.profile.connections.length);
  const [totalFollowers, setTotalFollowers] = useState(userData?.profile.followers.length);
  if (isUserProfileLoading || !userProfile) return <LinkedinFeed/>;
  
  return (
    <div className="dashCon">
      <div className="dashConItem">
        <div className="item1">
          <main className="pMain">
          <Toaster position="top-center" />
            {reportOverlay&&<div className="fixed inset-0 z-50 flex items-center justify-center backest w-screen h-screen">
              <div className="w-screen h-screen testBack">
                <div className="testCard">
                  <div className="flex h-1/5 w-1/1 justify-end">
                    <button className="logout text-6xl " onClick={()=>setReportOverlay(false)}>
                      X
                    </button>
                  </div>
                  <div className="flex justify-center items-center w-1/1 h-1/5">
                    <p className="text-2xl">report the profile</p>
                  </div>
                  {/* <div className="w-full center"><input type="text" className="bg-red-200" /></div> */}
                  <div className="flex justify-center items-center h-3/5 w-1/1">
                  
                  <button 
                      className="logout center" 
                      onClick={() => {setReportOverlay(false);
                        toast.success("Report sent");
                        doReport(userData?._id);
                      }}
                    >
                      Report
                    </button>
                      
                    <button className="nott" onClick={()=>setReportOverlay(false)}>
                      no
                    </button>
                  </div>
                </div>
              </div>
            </div>}
            <div className="pLeft">
              <div className="banner">
                <div className="banner-slide" >
                  <img
                    src={userData?.profile?.bannerImg.length>0?userData?.profile?.bannerImg:dummyBanner}
                    className="object-cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                
              </div>

              <div className="pInfo">
                <div className="pPicHolder">
                  <div className="pPic center ">
                    {userData?.profile?.pic ? (
                      <img
                        src={userData.profile.pic}
                        className="w-full h-full object-cover rounded-full border-2 border-gray-300"
                        alt="userPic"
                      />
                    ) : (
                      <div className="text-2xl center ">
                        <h1>{userData.username.charAt(0).toUpperCase()}</h1>
                      </div>
                    )}
                  </div>
                </div>
                <div className="profile-header">
                  <div className="profile-nameHolder">
                    <h1 className="profile-name gap-3">
                      <div className="text-2xl">
                        {userData.isVerified && (
                          <MdOutlineVerified className="color-blue" />
                        )}
                        {userData.username}
                      </div>
                      <div className="stat-item">
                        <span>
                          {userData.isVerified ? "verified" : "not verified"}
                        </span>
                      </div>
                      <div className="stat-item">
                        {isOwnProfile && (
                          <Link to={"/completep"} className="logoutb">
                            {!userData.isVerified && "Complete your profile"}
                          </Link>
                        )}
                      </div>
                    </h1>
                    {isOwnProfile && (
                      <button
                        className="editButton "
                        onClick={() => navigate("/editProfile")}
                      >
                        <MdOutlineModeEdit className="editIcon" />
                      </button>
                    )}
                  </div>
                  <div className="profile-title">Fields</div>
                  <div className="profile-title">{userData.email}</div>
                  <div className="profile-location ">
                    <span>
                      {userData.address ? user.current.address : "new user"}
                    </span>
                    <div className="stat-item cursor-pointer" onClick={()=>navigate("/connections")}>
                      <span>CONTACTS INFO</span>
                    </div>
                    <div className="w-8"></div>
                    {!isOwnProfile &&
                      !isInContactsLoading &&
                      !removingFromContacts && (
                        <span className=" text-blue-500 flex">
                          {contactsSaved ? (
                            <button
                              className="profile-btn btn-secondary stat-item"
                              onClick={handelRemovecontact}
                            >
                              remove from contact
                            </button>
                          ) : (
                            <button
                              className="profile-btn btn-secondary stat-item"
                              onClick={addContactHandler}
                            >
                              Add to connect
                            </button>
                          )}
                          
                        </span>
                        
                      )}
                  </div>

                  <div className="profile-stats">
                    <h1>Companies</h1>
                  </div>
                </div>

                <div className="profile-stats">
                  <div className="stat-item">
                    <span>
                      {totalConnections} connections
                    </span>
                  </div>
                  <div className="stat-item">
                    <span>{totalFollowers} Folowers</span>
                  </div>
                  <div className="stat-item">
                    <span>{userData.profile.following.length} Followring</span>
                  </div>
                  <div className="stat-item">
                    <span> Colobrations</span>
                  </div>
                  <div className="stat-item">
                    <span>accounts</span>
                  </div>
                  {userData.profile.role === "homemaker" && (
                    <div className="stat-item">
                      <span
                        onClick={() => navigate(`/profile/${username}/menu`)}
                      >
                        menu
                      </span>
                    </div>
                  )}
                  <div className="w-4 h-4 center" onClick={()=>setReportOverlay(true)}><span><MdOutlineReportProblem/></span></div>

                </div>

                {!isOwnProfile && (
                  <div className="profile-buttons">
                    {incon ? (
                      <button className="profile-btn btn-primary" onClick={handelRemoveconnect}>
                        {connectionRequestsLoading?'disconnecting...':'disconnect'}
                      </button>
                    ) : (
                      <button className="profile-btn btn-primary" onClick={handeladdConnection}>
                        {connectionRequestsLoading?"connecting...":"Connect"}
                      </button>
                    )}


                    {inFol ? (
                            <button
                              className="profile-btn btn-secondary stat-item"
                              onClick={()=>{sendUnfollowRequest(userData._id);setInFol(false);setTotalFollowers(prev => prev - 1)}}
                            >
                              {ToggleFollowingLoading ? 'Unfollowing...' : 'Unfollow'}
                            </button>
                          ) : (
                            <button
                              className="profile-btn btn-secondary stat-item"
                              onClick={()=>{sendFollowRequest(userData._id);setInFol(true);setTotalFollowers(prev => prev + 1)}}
                            >
                              {ToggleFollowingLoading ? 'Following...' : 'Follow'}
                            </button>
                          )}
                    {
                      <button
                        className="profile-btn btn-secondary"
                        onClick={() => navigate("/messages", { state: { newUser: userData } })}
                      >
                        Message
                      </button>
                    }
                    <button className="profile-btn btn-secondary">More</button>
                  </div>
                )}
              </div>
              <div className="pLBase">
                <h1>Achivements</h1>
              </div>
              

              <div className="pLBase"></div>
              <div className="pLBase"></div>
              <div className="pLBase"></div>
              <div className="pLBase"></div>
            </div>
            <div className="pRight flex flex-col items-center ">
              <div className="pRightTop flex flex-col items-center">
                <h6 className="" style={{ marginTop: "10px" }}>
                  My Top Colabroation
                </h6>
                <Suggestions />
              </div>
              <div className="pRightTop flex flex-col items-center">
                <h6 className="" style={{ marginTop: "10px" }}>
                  My Top Makers
                </h6>
                <Suggestions />
              </div>
              <div className="pRightTop flex flex-col items-center">
                <h6 className="" style={{ marginTop: "10px" }}>
                  My Top Orders
                </h6>
                <Suggestions />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export { Profile };
