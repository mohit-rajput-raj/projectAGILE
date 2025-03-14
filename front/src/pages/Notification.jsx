import React, { useState } from "react";
import "../coustomStyles/container.css";
import "../coustomStyles/notifications.css";
import black from "./black.tree.jpg";
import { MdOutlineArchive } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import { HiDotsHorizontal } from "react-icons/hi";
// import 

const Notification = () => {
  const [editIndex, setEditIndex] = useState(null);

  return (
    <div className="dashCon">
      <div className="dashConItem">
        <div className="item1">
          <main className="nMain">
          <Toaster position="top-center" reverseOrder={false} />
            <div className="nLeft">
              <div className="flex justify-center items-center h-10 w-full nHead nBlock">
                <h2>Notifications</h2>
              </div>
              <div className="flex h-10 w-full nBlock">
                <div className="nSpan">
                  <span className="span">recent</span>
                </div>
                <div className="nSpan">
                  <span className="span">jobs</span>
                </div>
                <div className="nSpan">
                  <span className="span">likes</span>
                </div>
                <div className="nSpan">
                  <span className="span">Comment</span>
                </div>
                <div className="nSpan">
                  <span className="span">Follow</span>
                </div>
                <div className="nSpan">
                  <span className="span">archive</span>
                </div>
              </div>
              <div className="nBlock not">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
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
                        <h3 className="text-2xl font-semibold">
                          Notification Title
                        </h3>
                        <p className="text-sm text-gray-600">
                          Notification Description
                        </p>
                        <p className="text-gray-500 text-xs">
                          Notification Date
                        </p>
                      </div>
                    </div>

                    {/* Bottom Section with Buttons */}
                    <button onClick={() => setEditIndex(i === editIndex ? null : i)} className="editBd">
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
                    
                    </button>
                    
                  </div>
                ))}
              </div>
            </div>
            <div className="nRight"></div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Notification;
