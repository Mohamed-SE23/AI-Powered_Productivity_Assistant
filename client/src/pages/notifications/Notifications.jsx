import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectNotifications } from "../../app/Notifications";

const Notifications = () => {
  const notificationsData = useSelector(selectNotifications);
  console.log(notificationsData)

  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState("all"); // Filter options: all, reminders, insights
  

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
    toast.success("All notifications marked as read!");
  };

  const filteredNotifications = notifications.filter((notif) =>
    filter === "all" ? true : notif.type === filter
  );

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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleMarkAllAsRead}
        >
          Mark All as Read
        </button>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif, i) => (
            <div
              key={i}
              className={`p-4 border rounded-lg ${
                notif.read ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">{notif.message}</p>
                <span className="text-xs text-gray-500">
                  {new Date(notif.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{notif.type}</p>
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
