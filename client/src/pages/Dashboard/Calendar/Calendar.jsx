import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { server } from "../../../config";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const view = Views.MONTH; // Default view is monthly

  useEffect(() => {
    const fetchTasks = async () => {
      const user = JSON.parse(localStorage.getItem("user")); // Assuming user is stored in localStorage
      const userId = user?.id;

      try {
        const { data } = await axios.get(`${server}/api/v1/tasks`, {
          params: { userId },
        });

        const formattedEvents = data.tasks.map((task) => ({
          title: task.title,
          start: new Date(task.startDate), // Task creation as start date
          end: new Date(task.dueDate), // Task due date
          description: task.description,
          priority: task.priority,
          completed: task.completed,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleSelectEvent = (event) => {
    alert(
      `Task: ${event.title}\nDescription: ${event.description}\nPriority: ${event.priority}\nCompleted: ${
        event.completed ? "Yes" : "No"
      }`
    );
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-2xl">
        Tasks Calendar
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100vh" }}
          onSelectEvent={handleSelectEvent}
          defaultView={view}
          views={[Views.DAY, Views.WEEK, Views.MONTH]}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
