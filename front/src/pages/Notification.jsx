import React, { useState } from "react";
import "../coustomStyles/container.css";
import "../coustomStyles/notifications.css";
import black from "./black.tree.jpg";
import { MdOutlineArchive } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { HiDotsHorizontal } from "react-icons/hi";
// import
import {LikeNotifications,JobsNotifications,CommentNotifications,OrderNotifications,NewFollowNotifications,NewConnectionNotifications} from "../components/notifications";

const bar = ["Orders","jobs","likes","Comment","Follow","Connections"];
const Notification = () => {
  const [barStatus,setBarStatus] = useState("Orders");
  // const [editIndex, setEditIndex] = useState(null);

  return (
    <div className="dashCon">
      <div className="dashConItem">
        <div className="item1">
          <main className="nMain h-screen overflow-y-scroll">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-100 h-100"></div>
            <div className="nLeft">
              <div className="flex justify-center items-center h-10 w-full nHead nBlock">
                <h2>Notifications</h2>
              </div>
              <div className="flex h-10 w-full nBlock">
                {bar.map((item,i)=>(
                  <div key={i} className="flex justify-evenly w-full cursor-pointer " onClick={()=>setBarStatus(item)}>
                    <span className="span ">{item}</span>
                  </div>
                ))}
                
              </div>
              <div className="nBlock not">
                {(barStatus==="Orders" && ([...Array(10)].map((_, i) => (
                  <OrderNotifications key={i} />
                )))
                || (barStatus==="jobs" && ([...Array(3)].map((_, i) => (
                  <JobsNotifications key={i} />
                )))
                )
                || (barStatus==="likes" && ([...Array(1)].map((_, i) => (
                  <LikeNotifications key={i} />
                )))
                )
                || (barStatus==="Comment" && ([...Array(10)].map((_, i) => (
                  <CommentNotifications key={i} />
                )))
                )
                || (barStatus==="Follow" && ([...Array(13)].map((_, i) => (
                  <NewFollowNotifications key={i} />
                )))
                )
                || (barStatus==="Connections" && ([...Array(2)].map((_, i) => (
                  <NewConnectionNotifications key={i} />
                )))
                )
                )}
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
