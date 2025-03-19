import React, { useState } from "react";
import "../coustomStyles/container.css";
import "../coustomStyles/notifications.css";
import { Toaster } from "react-hot-toast";
import { useNotificationStore } from "../Store/notificationStore.js";
import {
  LikeNotifications,
  JobsNotifications,
  CommentNotifications,
  OrderNotifications,
  NewFollowNotifications,
  NewConnectionNotifications,
} from "../components/notifications";

const bar = ["Orders", "Jobs", "Like", "Comment", "Follow", "Connections"];

const Notification = () => {
  const { unreadNotifications } = useNotificationStore();
  const [barStatus, setBarStatus] = useState("Orders");

  const notificationComponents = {
    Orders: <OrderNotifications />,
    Jobs: <JobsNotifications />,
    Like: <LikeNotifications />,
    Comment: <CommentNotifications />,
    Follow: <NewFollowNotifications />,
    Connections: <NewConnectionNotifications />,
  };

  return (
    <div className="dashCon">
      <div className="dashConItem">
        <div className="item1">
          <main className="nMain h-screen overflow-y-scroll">
            <Toaster position="top-center" />
            <div className="nLeft">
              <div className="flex justify-center items-center h-10 w-full nHead nBlock">
                <h2>Notifications</h2>
              </div>
              <div className="flex h-10 w-full nBlock">
                {bar.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-evenly w-full cursor-pointer"
                    onClick={() => setBarStatus(item)}
                  >
                    <span className="span">{item}</span>
                    {unreadNotifications?.[item] > 0 && (
                      <span className="bg-red-500 center w-4 h-4 text-white text-xs rounded-full px-2 py-1 relative -top-1">
                        {unreadNotifications?.[item]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="nBlock not">{notificationComponents[barStatus]}</div>
            </div>
            <div className="nRight"></div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Notification;
