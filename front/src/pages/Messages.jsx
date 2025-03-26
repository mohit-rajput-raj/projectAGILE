import React, { useEffect, useRef, useState } from "react";
import { useMessagesStore } from "../Store/messagesStore";
import { useAuthStore } from "../Store/AuthStore";
import { useLocation } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import SnapchatThread from "../skeletons/ProfileCardSkeleton";
import {
  ProfileComponentMessage,
  ProfileComponentMessageHeader,
} from "../components/profileCard";
import "../coustomStyles/container.css";
import "../coustomStyles/messages.css";
import MessageInput from "../components/MessageInput";

const SideBarUsersPFP = ({ sideBarUsers, setSelectedUser, onlineUsers }) => {
  if (!sideBarUsers || sideBarUsers.length === 0) return <p>No users available</p>;

  return (
    <>
      {sideBarUsers.map((user, i) => (
        <div className="p-0" key={user._id || i}>
          <button
            className="proBtn focus:ring-0"
            onClick={() => {
              console.log("User Selected:", user);
              setSelectedUser(user);
            }}
          >
            <ProfileComponentMessage sideUser={user} onlineUsers={onlineUsers} />
          </button>
        </div>
      ))}
    </>
  );
};

const Messages = () => {
  const location = useLocation();
  const { currUser, onlineUsers } = useAuthStore();
  const [sideBarUsers4, setSideBarUsers4] = useState([]);
  const messageEndRef = useRef(null);

  const {
    selectedUser,
    setSelectedUser,
    getSideBarUsers,
    sideBarUsers,
    sideBarUsersLoading,
    messages,
    error,
    getMessages,
    setSideBarUsers,
    messagesLoading,
    sendMessage,
    sendMessageLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useMessagesStore();

  // Fetch sidebar users on mount
  useEffect(() => {
    getSideBarUsers();
  }, []);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (!selectedUser?._id) return;

    console.log("Fetching messages for:", selectedUser);
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser]);

  // Update local sidebar users when store updates
  useEffect(() => {
    if (sideBarUsers) {
      setSideBarUsers4(sideBarUsers);
    }
  }, [sideBarUsers]);

  // Handle new user selection from location state
  useEffect(() => {
    if (location.state?.newUser) {
      const newUser = location.state.newUser;
      console.log("New user added:", newUser);

      setSideBarUsers4((prevUsers) => {
        if (!Array.isArray(prevUsers)) return [newUser];

        if (!prevUsers.some((user) => user._id === newUser._id)) {
          return [...prevUsers, newUser];
        }
        return prevUsers;
      });
    }
  }, [location.state]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (messageEndRef.current && messages?.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log("SideBarUsers4:", sideBarUsers4);
  console.log("Selected User:", selectedUser);

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
                  {sideBarUsersLoading ? (
                    [...Array(5)].map((_, i) => (
                      <div className="p-0" key={i}>
                        <button className="proBtn focus:ring-0">
                          <SnapchatThread />
                        </button>
                      </div>
                    ))
                  ) : sideBarUsers4.length > 0 ? (
                    <SideBarUsersPFP
                      sideBarUsers={sideBarUsers4}
                      setSelectedUser={setSelectedUser}
                      onlineUsers={onlineUsers}
                    />
                  ) : (
                    <div className="w-full h-2/3 center"> No chats yet</div>
                  )}
                </div>
              </div>

              <div className="mlr flex flex-col gap-2">
                <div className="mlrHead flex justify-between items-center">
                  <ProfileComponentMessageHeader selectedUser={selectedUser} onlineUsers={onlineUsers} />
                  <FaPhone className="h-6 w-6" />
                </div>

                <div className="mlrBase">
                  {messagesLoading ? (
                    [...Array(5)].map((_, i) => (
                      <div className="p-0" key={i}>
                        <button className="proBtn focus:ring-0">
                          <SnapchatThread />
                        </button>
                      </div>
                    ))
                  ) : !selectedUser ? (
                    <div className="w-full h-2/3 center">Select a user to start chatting</div>
                  ) : messages?.length === 0 ? (
                    <div className="w-full h-2/3 center">No messages yet</div>
                  ) : (
                    <div className="messages-container">
                      {messages.map((item, i) => (
                        <div
                          className={`w-full flex pad2 ${
                            item.senderId === currUser._id ? "justify-end" : "justify-start"
                          }`}
                          key={i}
                        >
                          <div
                            className={`max-w-xs md:max-w-md lg:max-w-lg pad2 rounded-xl shadow-md ${
                              item.senderId === currUser._id
                                ? "bg-blue-400 text-white rounded-br-none"
                                : "bg-gray-200 text-black rounded-bl-none"
                            }`}
                          >
                            <p className="break-words">{item.text}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={messageEndRef} />
                    </div>
                  )}
                </div>
                {selectedUser && <MessageInput />}
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
