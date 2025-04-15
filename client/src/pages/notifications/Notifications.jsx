import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification, fetchNotifications, selectNotifications } from "../../app/Notifications";
import { FaRegTrashAlt } from "react-icons/fa";
import { selectCurrentUser } from "../../app/UserInfo";
import { formatTime } from "../../utils/utilities";

const Notifications = () => {
  const notificationsData = useSelector(selectNotifications);
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentUser).id;

  // const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState("all"); // Filter options: all, reminders, insights

  // const handleMarkAllAsRead = () => {
  //   setNotifications((prev) =>
  //     prev.map((notif) => ({ ...notif, read: true }))
  //   );
  //   toast.success("All notifications marked as read!");
  // };

  // handle delete notifications
  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
    toast.success("Notification deleted!");
  };

  const filteredNotifications = notificationsData.filter((notif) =>
    filter === "all" ? true : notif.type === filter
  );

  useEffect(() => {
    dispatch(fetchNotifications(userId))
  },[]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      <div className="flex justify-between items-center mb-4">
        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="reminder">Reminders</option>
          <option value="insight">Insights</option>
        </select>
        {/* <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleMarkAllAsRead}
        >
          Mark All as Read
        </button> */}
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif, i) => (
            <div
              key={i}
              className={`p-4 border rounded-lg flex justify-between items-center ${
                notif.read ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="w-full">
                <div className="flex justify-between items-start gap-4">
                  <p className="font-semibold">{notif.message}</p>
                  <span className="text-xs text-right text-gray-500">
                    {/* {new Date(notif.timestamp).toLocaleString()} */}
                    {formatTime(notif.timestamp)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 mt-2">{notif.type}</p>
                  <button
                    className="text-red-500 hover:text-red-700 ml-4"
                    onClick={() => handleDelete(notif._id)}
                  >
                    <FaRegTrashAlt size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
