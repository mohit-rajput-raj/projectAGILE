import React, { useState } from "react";
import "./profileCard.css";
import black from "./black.tree.jpg";
import gian from "./gian.jpg";
import userPicc from "../pages/user.jpg";
import { Link } from "react-router-dom";

export const userPic =
  "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=";
// import '../coustomStyles/profile.css'
const ProfileComponent = ({ user }) => {
  if (!user) return null;
  // console.log(user);
  const styleC = {
    marginLeft: "10px",
  };
  // console.log(user);

  return (
    <Link to={`/profile/${user.username}`} style={{ color: "black" }}>
      <div className="flex  items-center gap-6 pCard cursor-pointer w-40">
        <div style={styleC} className="cardPic ">
          <img
            src={user.profile.pic ? user.profile.pic : userPicc}
            alt="User"
            className="w-full h-full object-cover rounded-full border-1 border-white"
          />
        </div>
        <div className="flex flex-col justify-end">
          <h5 className="username">{user.username}</h5>
          <h3 className="profession ">{user.profile.role}</h3>
        </div>
      </div>
    </Link>
  );
};
const ProfileComponentMessage = ({ sideUser, onlineUsers }) => {
  if (!sideUser) return null;
  const [isonline, setonline] = useState(onlineUsers.includes(sideUser._id));
  // console.log(sideUser);

  return (
    <div className="flex justify-center items-center gap-6 pCard">
      <div className="cardPic">
        <img
          src={sideUser.profile.pic || userPicc}
          alt="User"
          className="w-full h-full object-cover rounded-full border-2 border-gray-300"
        />
        {isonline && <div className="w-4 h-4 dot absolute"></div>}
      </div>
      <div className="flex flex-col justify-end">
        <h5 className="username">{sideUser.username}</h5>
        <h3 className="profession">{sideUser.profile.role}</h3>
        {isonline && <h3 className="profession">online</h3>}
      </div>
    </div>
  );
};
const ProfileComponentMessageHeader = ({ selectedUser, onlineUsers }) => {
  if (!selectedUser) return null;
  const [isonline, setonline] = useState(
    onlineUsers.includes(selectedUser._id)
  );

  return (
    <div className="flex justify-center items-center gap-6 pCard">
      <div className="cardPic">
        <img
          src={selectedUser.profile.pic || userPicc}
          alt="User"
          className="w-full h-full object-cover rounded-full border-2 border-gray-300"
        />
      </div>
      <div className="flex flex-col justify-end">
        <h5 className="username">{selectedUser.username || "user"}</h5>
      </div>
    </div>
  );
};
import { useAdminStore } from "../Store/AdminStore";
const UserReportCard = ({ user }) => {
  const { bannUser, banningLoading } = useAdminStore();
  if (!user) return null;
  const [banned, setBanned] = useState(user.profile?.isBanned);
  return (
    <div className="flex  justify-evenly items-center gap-6 w-full">
      <div className="cardPic">
        <img
          src={user?.profile?.pic || userPicc}
          alt="User"
          className="w-full h-full object-cover rounded-full border-2 border-gray-300"
        />
      </div>
      <div className="flex flex-col justify-end">
        <h5 className="username">{user.username || "user"}</h5>
      </div>
      <span>{user.reports?.length} reports</span>
      <div className="flex flex-col justify-end">
        {!banned ? (
          <button
            className="button w-23 text-red-500"
            onClick={() => {
              bannUser(user._id);
              setBanned(true);
            }}
          >
            {banningLoading ? "banning..." : "bann now"}
          </button>
        ) : (
          <button
            className="button w-23 text-yellow-500"
            onClick={() => {
              bannUser(user._id);
              setBanned(false);
            }}
          >
            {banningLoading ? "unbanning..." : "banned"}
          </button>
        )}
      </div>
    </div>
  );
};
const UserProfile = ({ user }) => {
  const { bannUser, banningLoading } = useAdminStore();
  if (!user) return null;
  const [banned, setBanned] = useState(user.profile?.isBanned);
  return (
    <div className="flex justify-between items-center gap-6 w-full">
      <div className="cardPic">
        <img
          src={user?.profile?.pic || userPicc}
          alt="User"
          className="w-full h-full object-cover rounded-full border-2 border-gray-300"
        />
      </div>
      <div className="flex flex-col justify-end">
        <h5 className="username">{user.username || "user"}</h5>
        <div className="w-30 overflow-x-scroll"><p>{user.email}</p></div>
      </div>
      <span>{user.reports?.length} reports</span>
      <div className="flex flex-col justify-end">
        {!banned ? (
          <button
            className="button w-23 text-red-500"
            onClick={() => {
              bannUser(user._id);
              setBanned(true);
            }}
          >
            {banningLoading ? "banning..." : "bann now"}
          </button>
        ) : (
          <button
            className="button w-23 text-yellow-500"
            onClick={() => {
              bannUser(user._id);
              setBanned(false);
            }}
          >
            {banningLoading ? "unbanning..." : "banned"}
          </button>
        )}
      </div>
    </div>
  );
};

export {
  ProfileComponent,
  ProfileComponentMessage,
  ProfileComponentMessageHeader,
  UserReportCard,
  UserProfile
};
