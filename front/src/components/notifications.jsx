import React, { useEffect, useState } from "react";
import black from "./black.tree.jpg";
import { MdOutlineArchive } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useNotificationStore } from "../Store/notificationStore.js";

const CommentNotifications = () => {
  const [editIndex, setEditIndex] = useState(null);
  const { getCommentNotifications, commentNotifications,makeUnRead } = useNotificationStore();

  useEffect(() => {
    getCommentNotifications();
    makeUnRead("Comment");
  }, [getCommentNotifications,makeUnRead]);
  console.log(commentNotifications,"comments123");
  

  return (
    <div>
      {commentNotifications?.length===0 && <div className="w-full h-20 center">no notifications</div>}
      {commentNotifications?.map((notification, index) => (
        <div
          key={index}
          className="nItem flex gap-2 bg-white rounded-lg shadow-md relative w-full"
        >
          <div className="flex gap-2 items-start w-full justify-between">
            <div className="flex gap-2">
              <div className="nItemLeft">
                <img
                  src={black}
                  alt="profile"
                  className="fit w-12 h-12 rounded-full"
                />
              </div>
            </div>

            <div className="nItemRight flex flex-col p-4 rounded-lg flex-1">
              <h3 className="text-2xl font-semibold">Comment Notification</h3>
              <p className="text-sm text-gray-600">{notification.description}</p>
              <p className="text-gray-500 text-xs">{notification.date}</p>
            </div>

            <button onClick={() => setEditIndex(index === editIndex ? null : index)} className="editBd">
              <HiDotsHorizontal />
              {index === editIndex && (
                <div className="flex gap-2 justify-center items-center nEBox">
                  <button
                    className="button"
                    onClick={() => toast.success("Notification Archived")}
                  >
                    <MdOutlineArchive className="h-10 w-10" />
                  </button>
                  <button
                    className="button"
                    onClick={() => toast.success("Notification Deleted")}
                  >
                    <AiTwotoneDelete className="h-10 w-10" />
                  </button>
                </div>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const OrderNotifications = () => {
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(null);
  const { getOrderNotifications, orderNotifications ,makeUnRead} = useNotificationStore();

  useEffect(() => {
    getOrderNotifications();
    makeUnRead("Order")
  }, [getOrderNotifications,makeUnRead]);
  console.log(orderNotifications,"orders");
  

  return (
    <div>
      {orderNotifications?.length===0 && <div className="w-full h-20 center">no notifications</div>}
      {orderNotifications?.map((notification, index) => (
        <div
          key={index}
          className="nItem flex gap-2 bg-white rounded-lg shadow-md relative"
        >
          <div className="flex gap-2 items-start w-full justify-between">
            <div className="flex gap-2">
              <div className="nItemLeft">
                <img
                  src={black}
                  alt="profile"
                  className="fit w-12 h-12 rounded-full"
                />
              </div>
            </div>

            <div className="nItemRight flex flex-col p-4 rounded-lg flex-1">
              <h4 className="text-xl font-semibold">
                <span><Link to={`/profile/${notification.user}`}>{notification.user}</Link></span> deployed a new order
              </h4>
              <p className="text-sm text-gray-600">{notification.description}</p>
              <p className="text-gray-500 text-xs flex justify-between">
                {notification.date} <span>{notification.time}</span>
              </p>
            </div>
            <span className="text-blue-500 cursor-pointer" onClick={() => navigate(`/order/${notification.orderId}`)}>
              Details
            </span>
            <button onClick={() => setEditIndex(index === editIndex ? null : index)} className="editBd">
              <HiDotsHorizontal />
              {index === editIndex && (
                <div className="flex gap-2 justify-center items-center nEBox">
                  <button
                    className="button"
                    onClick={() => toast.success("Notification Archived")}
                  >
                    <MdOutlineArchive className="h-10 w-10" />
                  </button>
                  <button
                    className="button"
                    onClick={() => toast.success("Notification Deleted")}
                  >
                    <AiTwotoneDelete className="h-10 w-10" />
                  </button>
                </div>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const NewConnectionNotifications = () => {
  const [editIndex, setEditIndex] = useState(null);
  const {getConnectionNotification, connectionNotifications,makeUnRead } = useNotificationStore();

  useEffect(() => {
    getConnectionNotification();
    makeUnRead("Connection")
  }, [getConnectionNotification,makeUnRead]);
  console.log(connectionNotifications,"connections");
  

  return (
    <div>
      {connectionNotifications?.length===0 && <div className="w-full h-20 center">no notifications</div>}
      {connectionNotifications?.map((notification, index) => (
        <div
          key={index}
          className="nItem flex gap-2 bg-white rounded-lg shadow-md relative"
        >
          <div className="flex gap-2 items-start">
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

            <div className="nItemRight flex flex-col p-4 rounded-lg flex-1">
              <h3 className="text-2xl font-semibold">New Connection</h3>
              <p className="text-sm text-gray-600">{notification.description}</p>
              <p className="text-gray-500 text-xs">{notification.date}</p>
            </div>
            <button onClick={() => setEditIndex(index === editIndex ? null : index)} className="editBd">
              <HiDotsHorizontal />
              {index === editIndex && (
                <div className="flex gap-2 justify-center items-center nEBox">
                  <button
                    className="button"
                    onClick={() => toast.success("Notification Archived")}
                  >
                    <MdOutlineArchive className="h-10 w-10" />
                  </button>
                  <button
                    className="button"
                    onClick={() => toast.success("Notification Deleted")}
                  >
                    <AiTwotoneDelete className="h-10 w-10" />
                  </button>
                </div>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const NewFollowNotifications = () => {
  const { getFollowNotifications, followNotifications,makeUnRead } = useNotificationStore();
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    getFollowNotifications();
    makeUnRead("Follow");
  }, [getFollowNotifications,makeUnRead]);
  console.log(followNotifications,"folloes");
  

  return (
    <div>
      {followNotifications?.length===0 && <div className="w-full h-20 center">no notifications</div>}
      {followNotifications?.map((notification, index) => (
        <div
          key={index}
          className="nItem flex gap-2 bg-white rounded-lg shadow-md justify-between"
        >
          <div className="flex gap-2 items-start w-full justify-between">
            <div className="flex gap-2">
              <div className="nItemLeft">
                <img
                  src={black}
                  alt="profile"
                  className="fit w-12 h-12 rounded-full"
                />
              </div>
            </div>

            <div className="nItemRight flex flex-col p-4 rounded-lg flex-1 w-full">
              <p className="text-sm text-gray-900">
                <Link to={`/profile/${notification.user}`}>
                  <span className="font-semibold">{notification.user}</span>
                </Link>{" "}
                starts following you
              </p>
              <p className="text-gray-500 text-xs">{notification.date}</p>
            </div>
            <button onClick={() => setEditIndex(index === editIndex ? null : index)} className="editBd">
              <HiDotsHorizontal />
              {index === editIndex && (
                <div className="flex gap-2 justify-center items-center nEBox">
                  <button
                    className="button"
                    onClick={() => toast.success("Notification Archived")}
                  >
                    <MdOutlineArchive className="h-10 w-10" />
                  </button>
                  <button
                    className="button"
                    onClick={() => toast.success("Notification Deleted")}
                  >
                    <AiTwotoneDelete className="h-10 w-10" />
                  </button>
                </div>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const LikeNotifications = () => {
  const [editIndex, setEditIndex] = useState(null);
  const { getLikeNotifications, likeNotifications ,makeUnRead} = useNotificationStore();

  useEffect(() => {
    getLikeNotifications();
    makeUnRead("Like");
  }, [getLikeNotifications,makeUnRead]);
  console.log(likeNotifications,"likes");
  

  return (
    <div>
      {likeNotifications?.length===0 && <div className="w-full h-20 center">no notifications</div>}
      {likeNotifications?.map((notification, index) => (
        <div
          key={index}
          className="nItem flex gap-2 bg-white rounded-lg shadow-md relative"
        >
          <div className="flex gap-2 items-start">
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

            <div className="nItemRight flex flex-col p-4 rounded-lg flex-1">
              <h3 className="text-2xl font-semibold">Like Notification</h3>
              <p className="text-sm text-gray-600">{notification.description}</p>
              <p className="text-gray-500 text-xs">{notification.date}</p>
            </div>
            <button onClick={() => setEditIndex(index === editIndex ? null : index)} className="editBd">
              <HiDotsHorizontal />
              {index === editIndex && (
                <div className="flex gap-2 justify-center items-center nEBox">
                  <button
                    className="button"
                    onClick={() => toast.success("Notification Archived")}
                  >
                    <MdOutlineArchive className="h-10 w-10" />
                  </button>
                  <button
                    className="button"
                    onClick={() => toast.success("Notification Deleted")}
                  >
                    <AiTwotoneDelete className="h-10 w-10" />
                  </button>
                </div>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const JobsNotifications = () => {
    
  const [editIndex, setEditIndex] = useState(null);
  const { getJobNotifications, jobNotifications,makeUnRead } = useNotificationStore();

  useEffect(() => {
    getJobNotifications();
    makeUnRead("Jobs");
  }, [getJobNotifications,makeUnRead]);
  console.log(jobNotifications,"jobs");
  

  return (
    <div>
      {jobNotifications?.length===0 && <div className="w-full h-20 center">no notifications</div>}
      {jobNotifications?.map((notification) => (
        <div
          key={notification._id}
          className="nItem flex gap-2 bg-white rounded-lg shadow-md relative"
        >
          <div className="flex gap-2 items-start">
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

            <div className="nItemRight flex flex-col p-4 rounded-lg flex-1">
              <h3 className="text-2xl font-semibold">Job Notification</h3>
              <p className="text-sm text-gray-600">{notification.description}</p>
              <p className="text-gray-500 text-xs">{notification.date}</p>
            </div>
            <button onClick={() => setEditIndex(index === editIndex ? null : index)} className="editBd">
              <HiDotsHorizontal />
              {index === editIndex && (
                <div className="flex gap-2 justify-center items-center nEBox">
                  <button
                    className="button"
                    onClick={() => toast.success("Notification Archived")}
                  >
                    <MdOutlineArchive className="h-10 w-10" />
                  </button>
                  <button
                    className="button"
                    onClick={() => toast.success("Notification Deleted")}
                  >
                    <AiTwotoneDelete className="h-10 w-10" />
                  </button>
                </div>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export {
  LikeNotifications,
  JobsNotifications,
  CommentNotifications,
  OrderNotifications,
  NewFollowNotifications,
  NewConnectionNotifications
};
