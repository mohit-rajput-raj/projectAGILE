import React from "react";
import black from "./black.tree.jpg";
import { MdOutlineArchive } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { HiDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CommentNotifications = () => {
    return (
      <div
        
        className="nItem flex gap-2 bg-white rounded-lg shadow-md relative w-full"
      >
        {/* Top Section with Images + Text */}
        <div className="flex gap-20 items-start w-full justify-between">
          {/* Left Images */}
          <div className="flex gap-2">
            <div className="nItemLeft">
              <img
                src={black}
                alt="profile"
                className="fit w-12 h-12 rounded-full"
              />
            </div>
            
          </div>
  
          {/* Right Text Section */}
          <div className="nItemRight flex flex-col p-4 rounded-lg flex-1 ">
            <h3 className="text-2xl font-semibold">Notification Title</h3>
            <p className="text-sm text-gray-600">Notification Description</p>
            <p className="text-gray-500 text-xs">Notification Date</p>
          </div>
          <div className="nItemLeft">
              <img
                src={black}
                alt=""
                className=" fit w-12 h-12 rounded-lg"
              />
            </div>
        </div>
  
        
      </div>
    );
  };

  const OrderNotifications = () => {
    const navigate = useNavigate();
    return (
      <div
        
        className="nItem flex gap-2 bg-white rounded-lg shadow-md relative"
      >
        {/* Top Section with Images + Text */}
        <div className="flex gap-2 items-start w-full justify-between ">
          {/* Left Images */}
          <div className="flex gap-2">
            <div className="nItemLeft">
              <img
                src={black}
                alt="profile"
                className="fit w-12 h-12 rounded-full"
              />
            </div>
            
          </div>
  
          {/* Right Text Section */}
          <div className="nItemRight flex flex-col p-4 rounded-lg flex-1">
            <h4 className="text-xl font-semibold"><span><Link to="/profile/mohit">sachin </Link></span> deploy a new order</h4>
            <p className="text-sm text-gray-600">nonveg items for maridge cerimony</p>
            <p className="text-gray-500 text-xs flex justify-between">12/23/45 <span>1s</span></p>
          </div>
          <span className="text-blue-500 cursor-pointer center" onClick={()=>navigate('/order/325678')}>details</span>
        </div>
  
        
      </div>
    );
  };
  const NewConnectionNotifications = () => {
    return (
      <div
        
        className="nItem flex gap-2 bg-white rounded-lg shadow-md relative"
      >
        {/* Top Section with Images + Text */}
        <div className="flex gap-2 items-start">
          {/* Left Images */}
          <div className="flex gap-2">
            <div className="nItemLeft">
              <img
                src={black}
                alt="profile"
                className="fit w-12 h-12 rounded-full"
              />
            </div>
            <div className="nItemLeft">
              <img
                src={black}
                alt=""
                className="related fit w-12 h-12 rounded-lg"
              />
            </div>
          </div>
  
          {/* Right Text Section */}
          <div className="nItemRight flex flex-col p-4 rounded-lg flex-1">
            <h3 className="text-2xl font-semibold">Notification Title</h3>
            <p className="text-sm text-gray-600">Notification Description</p>
            <p className="text-gray-500 text-xs">Notification Date</p>
          </div>
        </div>
  
        
      </div>
    );
  };
  const NewFollowNotifications = () => {
    return (
      <div
        
        className="nItem flex gap-2 bg-white rounded-lg shadow-md justify-between"
      >
        {/* Top Section with Images + Text */}
        <div className="flex gap-2 items-start w-full justify-between">
          {/* Left Images */}
          <div className="flex gap-2">
            <div className="nItemLeft">
              <img
                src={black}
                alt="profile"
                className="fit w-12 h-12 rounded-full"
              />
            </div>
            
          </div>
  
          {/* Right Text Section */}
          <div className="nItemRight flex flex-col p-4 rounded-lg flex-1 w-full">
            {/* <h3 className="text-2xl font-semibold">Notification Title</h3> */}
            <p className="text-sm text-gray-900 "><Link to="/profile/mohit"><span className="font-semibold ">sachin </span> </Link> starts following you</p>
            <p className="text-gray-500 text-xs">Notification Date</p>
          </div>
        </div>
  
        
      </div>
    );
  };
  
const LikeNotifications = () => {
  return (
    <div
      
      className="nItem flex gap-2 bg-white rounded-lg shadow-md relative"
    >
      {/* Top Section with Images + Text */}
      <div className="flex gap-2 items-start">
        {/* Left Images */}
        <div className="flex gap-2">
          <div className="nItemLeft">
            <img
              src={black}
              alt="profile"
              className="fit w-12 h-12 rounded-full"
            />
          </div>
          <div className="nItemLeft">
            <img
              src={black}
              alt=""
              className="related fit w-12 h-12 rounded-lg"
            />
          </div>
        </div>

        {/* Right Text Section */}
        <div className="nItemRight flex flex-col p-4 rounded-lg flex-1">
          <h3 className="text-2xl font-semibold">Notification Title</h3>
          <p className="text-sm text-gray-600">Notification Description</p>
          <p className="text-gray-500 text-xs">Notification Date</p>
        </div>
      </div>

      
    </div>
  );
};
const JobsNotifications = () => {
    return (
      <div
        
        className="nItem flex gap-2 bg-white rounded-lg shadow-md relative"
      >
        {/* Top Section with Images + Text */}
        <div className="flex gap-2 items-start">
          {/* Left Images */}
          <div className="flex gap-2">
            <div className="nItemLeft">
              <img
                src={black}
                alt="profile"
                className="fit w-12 h-12 rounded-full"
              />
            </div>
            <div className="nItemLeft">
              <img
                src={black}
                alt=""
                className="related fit w-12 h-12 rounded-lg"
              />
            </div>
          </div>
  
          {/* Right Text Section */}
          <div className="nItemRight flex flex-col p-4 rounded-lg flex-1">
            <h3 className="text-2xl font-semibold">Notification Title</h3>
            <p className="text-sm text-gray-600">Notification Description</p>
            <p className="text-gray-500 text-xs">Notification Date</p>
          </div>
        </div>
  
        
      </div>
    );
  };
export  {LikeNotifications,JobsNotifications,CommentNotifications,OrderNotifications,NewFollowNotifications,NewConnectionNotifications};









































{/* Bottom Section with Buttons */}
      {/* <button onClick={() => setEditIndex(i === editIndex ? null : i)} className="editBd">
                      <HiDotsHorizontal />
                      {i === editIndex && (
                      <div className="flex gap-2 justify-center items-center  nEBox">
                        <button
                          className="button"
                          onClick={() => toast.success("Notification Archived")}
                        >
                          <MdOutlineArchive className="h-10 w-10 " />
                        </button>
                        
                        <button
                          className="button"
                          onClick={() => toast.success("Notification Deleted")}
                        >
                          <AiTwotoneDelete className="h-10 w-10 " />
                        </button>
                      </div>
                    )}
                    
                    </button> */}
