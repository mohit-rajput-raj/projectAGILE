import React, { useState } from "react";
import "./profileCard.css";
import black from "./black.tree.jpg";
import gian from "./gian.jpg";
export const userPic = "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=";
// import '../coustomStyles/profile.css'
const ProfileComponent = ({ user }) => {
  if (!user) return null;
  console.log(user);
  const styleC = {
    marginLeft: "10px",
  };
  return (
    <div className="flex  items-center gap-6 pCard cursor-pointer w-40">
      <div style={styleC} className="cardPic ">
        <img
          src={
            user.profile.pic
              ? user.profile.pic
              : "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
          }
          alt="User"
          className="fitCover"
        />
      </div>
      <div className="flex flex-col justify-end">
        <h5 className="username">{user.username}</h5>
        <h3 className="profession "></h3>
      </div>
    </div>
  );
};
const ProfileComponentMessage = ({ sideUser }) => {
  const [isonline, setonline] = useState(true);

  return (
    <div className="flex justify-center items-center gap-6 pCard">
      <div className="cardPic">
        <img src={sideUser.pic} alt="User" />
        {isonline && <div className="w-4 h-4 dot absolute"></div>}
      </div>
      <div className="flex flex-col justify-end">
        <h5 className="username">{sideUser.username}</h5>
        <h3 className="profession">{sideUser.role}</h3>
        {isonline && <h3 className="profession">online</h3>}
      </div>
    </div>
  );
};
const ProfileComponentMessageHeader = () => {
  const [isonline, setonline] = useState(true);

  return (
    <div className="flex justify-center items-center gap-6 pCard">
      <div className="cardPic">
        <img src={black} alt="User" />
      </div>
      <div className="flex flex-col justify-end">
        <h5 className="username">User Name</h5>
      </div>
    </div>
  );
};

export {
  ProfileComponent,
  ProfileComponentMessage,
  ProfileComponentMessageHeader,
};
