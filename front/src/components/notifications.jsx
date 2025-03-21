import React, { useEffect, useState } from "react";
import { MdOutlineArchive } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../Store/notificationStore.js";
import { useDashBoardStore } from "../Store/dashBoardStore.js";

const userPic = "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=";
// import {useDashBoardStore} from "../Store/dashBoardStore.js";
const NotificationItem = ({fetchNotifications, notification, title }) => {
  const [isAccepted, setIsAccepted] = useState(notification.accepted);
  const [isRejected, setIsRejected] = useState(notification.rejected);
  const {makeAccept, makeReject, get} = useDashBoardStore();
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();
  const handelAccept = () => {
    makeAccept({
      data: notification
    });
    setIsAccepted(!isAccepted);
    fetchNotifications();
  };
  const handelReject = () => {
    makeReject({data: notification});
    setIsRejected(!isRejected);
    fetchNotifications();
  };
  const handleClick = () => {
    switch (notification.type) {
      case "Order":
        navigate(`/order/${notification.relatedPost}`);
        break;
      case "Like":
        navigate(`/post/${notification.relatedPost}`);
        break;
      case "Jobs":
        navigate(`/job/${notification.relatedPost}`);
        break;
      case "Comment":
        navigate(`/post/${notification.relatedPost}#comments`);
        break;
      case "Follow":
        navigate(`/profile/${notification.sender?.username}`);
        break;
      case "Connection":
        navigate(`/profile/${notification.sender?.id}`);
        break;
      default:
        break;
    }
  };
  const {makeAcceptLoading, makeRejectLoading} = useDashBoardStore();

  return (
    <div
      className="nItem flex gap-4 bg-white p-4 rounded-lg shadow-md relative w-full hover:shadow-lg transition-all cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex gap-4 items-start w-full justify-between">
        <div className="flex gap-4">
          <img
            src={notification.sender?.profile?.pic || userPic}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover border"
          />
        </div>

        <div className="text-lg text-blue-900 font-semibold">
          {notification.sender.username}
        </div>

        <div className="nItemRight flex flex-col flex-1">
          {/* <h3 className="text-lg font-semibold">{title}</h3> */}
          <p className="text-lg text-gray-600 font-semibold">{notification.description}</p>
         
        </div>
        <p className="text-gray-500 text-xs">{new Date(notification.createdAt).toLocaleString()}</p>
        {notification.type === "Orders" && (!(isAccepted || isRejected) ?
          <>
           <button className="button bg-blue-200" onClick={handelAccept}>
            Accept
          </button>
          <button className="button bg-red-200" onClick={handelReject}>
            Reject
          </button>
          </>:
          <>
          <p className="text-gray-500 text-xs">{isAccepted ? "Accepted" : "Rejected"}</p>
          </>
        )}
       
        <button onClick={(e) => { e.stopPropagation(); setEditIndex(editIndex ? null : notification._id); }} className="editBd">
          <HiDotsHorizontal />
          {editIndex === notification._id && (
            <div className="flex gap-2 justify-center items-center nEBox">
              <button className="button" onClick={() => toast.success("Notification Archived")}>
                <MdOutlineArchive className="h-6 w-6" />
              </button>
              <button className="button" onClick={() => toast.success("Notification Deleted")}>
                <AiTwotoneDelete className="h-6 w-6" />
              </button>
            </div>
          )}
        </button>
      </div>
      {makeAcceptLoading && <div className="loading"></div>}
      {makeRejectLoading && <div className="loading"></div>}
    </div>
  );
};

const NotificationList = ({ title, fetchNotifications, notifications, markUnread }) => {
  const { makeAcceptLoading, makeRejectLoading } = useDashBoardStore();
  useEffect(() => {
    fetchNotifications();
    markUnread(title);
  }, [fetchNotifications, markUnread, makeAcceptLoading, makeRejectLoading]);

  return (
    <div>
      {notifications?.length === 0 && (
        <div className="w-full h-20 flex items-center justify-center text-gray-500">No notifications</div>
      )}
      {notifications?.map((notification) => (
        <NotificationItem fetchNotifications={fetchNotifications} key={notification._id} notification={notification} title={title} />
      ))}
    </div>
  );
};

export const LikeNotifications = () => {
  const { getLikeNotifications, likeNotifications, makeUnRead } = useNotificationStore();
  return <NotificationList title="Like" fetchNotifications={getLikeNotifications} notifications={likeNotifications} markUnread={makeUnRead} />;
};

export const CommentNotifications = () => {
  const { getCommentNotifications, commentNotifications, makeUnRead } = useNotificationStore();
  return <NotificationList title="Comment" fetchNotifications={getCommentNotifications} notifications={commentNotifications} markUnread={makeUnRead} />;
};

export const OrderNotifications = () => {
  const { getOrderNotifications, orderNotifications, makeUnRead } = useNotificationStore();
  return <NotificationList title="Orders" fetchNotifications={getOrderNotifications} notifications={orderNotifications} markUnread={makeUnRead} />;
};

export const NewConnectionNotifications = () => {
  const { getConnectionNotification, connectionNotifications, makeUnRead } = useNotificationStore();
  return <NotificationList title="Connection" fetchNotifications={getConnectionNotification} notifications={connectionNotifications} markUnread={makeUnRead} />;
};

export const NewFollowNotifications = () => {
  const { getFollowNotifications, followNotifications, makeUnRead } = useNotificationStore();
  return <NotificationList title="Follow" fetchNotifications={getFollowNotifications} notifications={followNotifications} markUnread={makeUnRead} />;
};

export const JobsNotifications = () => {
  const { getJobNotifications, jobNotifications, makeUnRead } = useNotificationStore();
  return <NotificationList title="Jobs" fetchNotifications={getJobNotifications} notifications={jobNotifications} markUnread={makeUnRead} />;
};
