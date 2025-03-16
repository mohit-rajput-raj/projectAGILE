import React, { useEffect, useState } from "react";
import "../coustomStyles/container.css";
import "../coustomStyles/messages.css";
import {
  ProfileComponentMessage,
  ProfileComponentMessageHeader,
} from "../components/profileCard";
import { FaPhone } from "react-icons/fa";
import { useMessagesStore } from "../Store/messagesStore.js";
import SnapchatThread from "../skeletons/ProfileCardSkeleton.jsx";
import { div } from "three/tsl";
import { useAuthStore } from "../Store/AuthStore";
const Messages = () => {
  const {currUser} = useAuthStore();
  const [selectedUser, setSelectedUser] = useState("");

  const {
    getSideBarUsers,
    sideBarUsers,
    sideBarUsersLoding,
    messages,
    error,
    getMessages,
    sendMessage,
    updateMessage,
    deleteMessage,
    messagesLoading,
    sendMessageLoading,
    updateMessageLoading,
    deleteMessageLoading
  } = useMessagesStore();
  // console.log(sideBarUsers);

  useEffect(() => {
    getSideBarUsers();
  }, [getSideBarUsers]);
  useEffect(() => {
    if(selectedUser.length!==0)getMessages(selectedUser);
  }, [selectedUser,getMessages]);
  if (error) {
    return <div>Error loading sidebar users.</div>;
  }

  return (
    <div className="dashCon">
      <div className="dashConItem">
        <div className="item1">
          <main className="mBox">
            <div className="mLeft">
              <div className="mll flex flex-col gap-2">
                <div className="mllHead">
                  <h1>Profiles</h1>
                </div>
                <div className="mllBase">
                  {sideBarUsersLoding ? (
                    [...Array(5)].map((_, i) => (
                      <div className="p-0" key={i}>
                        <button className="proBtn focus:ring-0">
                          <SnapchatThread />
                        </button>
                      </div>
                    ))
                  ) : sideBarUsers ? (
                    sideBarUsers.map((sideUser, i) => (
                      <div className="p-0" key={i}>
                        <button
                          className="proBtn focus:ring-0"
                          onClick={() => setSelectedUser(sideUser._id)}
                        >
                          <ProfileComponentMessage sideUser={sideUser} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="w-full h-2/3 center"> No chats yet</div>
                  )}
                </div>
              </div>
              <div className="mlr flex flex-col gap-2">
                <div className="mlrHead flex justify-between items-center">
                  <ProfileComponentMessageHeader />
                  <FaPhone className="h-6 w-6" />
                </div>
                <div className="mlrBase">
                  {messages.length===0?<div className="w-full h-2/3 center"> No messages yet</div>: messages.map((item, i) => (
                    <div className={`w-full rounded ${item.senderId === currUser._Id ? "MessagepaddingLeft" : "MessagepaddingRight"} `} key={i}>
                      <p className={`p-2 ${item.senderId === currUser._Id ? "bg-blue-400 rounded-2xl p-4" : "bg-blue-100 rounded-2xl p-4"} `}>
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mRight"></div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Messages;
