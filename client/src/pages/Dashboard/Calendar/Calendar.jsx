import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH); // Default view is monthly

  useEffect(() => {
    const fetchTasks = async () => {
      const user = JSON.parse(localStorage.getItem('user')); // Assuming user is stored in localStorage
      const userId = user?.id;

      try {
        const { data } = await axios.get('/api/v1/tasks', {
          params: { userId },
        });

        const formattedEvents = data.tasks.map(task => ({
          title: task.title,
          start: new Date(task.createdAt), // Due date as start date
          end: new Date(task.dueDate), // Same as start date
          description: task.description,
          priority: task.priority,
          completed: task.completed,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleSelectEvent = event => {
    alert(`Task: ${event.title}\nDescription: ${event.description}\nPriority: ${event.priority}\nCompleted: ${event.completed ? 'Yes' : 'No'}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Tasks Calendar</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        {/* <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${view === Views.DAY ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setView(Views.DAY)}
          >
            Daily
          </button>
          <button
            className={`px-4 py-2 mr-2 rounded ${view === Views.WEEK ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setView(Views.WEEK)}
          >
            Weekly
          </button>
          <button
            className={`px-4 py-2 rounded ${view === Views.MONTH ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setView(Views.MONTH)}
          >
            Monthly
          </button>
        </div> */}
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          defaultView={view}
          views={[Views.DAY, Views.WEEK, Views.MONTH]}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
