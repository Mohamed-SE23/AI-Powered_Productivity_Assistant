import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import TaskPrioritization from "./TaskPrioritization";
import DailySummary from "./DailySummary";
import WeatherWidget from "./WeatherWidget";
import axios from "axios";
import { server } from "../../../config";
import { selectAllTasks } from "../../../app/tasksSlice";
import Typewriter from "../../../components/Typewriter";

const AiAssistant = () => {
  const tasks = useSelector(selectAllTasks);
  const [weather, setWeather] = useState({
    location: "Rabak",
    temperature: 23,
    condition: "clear sky",
  });
  const [aiInsights, setAiInsights] = useState("");
  const [locationError, setLocationError] = useState("");

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Fetch weather data using latitude and longitude
            const response = await axios.get(`${server}/api/v1/weather`, {
              params: { lat: latitude, lon: longitude },
            });
            setWeather(response.data);
          } catch (error) {
            console.error("Error fetching weather data:", error.message);
            setWeather(null);
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setLocationError(
            "Unable to retrieve location. Using default location."
          );
          // Fallback to a default location
          axios
            .get(`${server}/api/v1/weather`, { params: { location: "Khartoum" } })
            .then((response) => setWeather(response.data));
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      // Fallback to a default location
      axios
        .get(`${server}/api/v1/weather`, { params: { location: "Khartoum" } })
        .then((response) => setWeather(response.data));
    }

    // Fetch AI insights
    axios
      .post(`${server}/api/v1/ai-assistant`, { tasks },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      .then((response) => {
        console.log(response.data);
        setAiInsights(response.data.insights)});
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen -mt-8 sm:px-2">
      <h1 className="text-3xl font-bold text-center mb-6 sm:text-2xl">
        AI Assistant
      </h1>
      {locationError && (
        <p className="text-red-500 text-center mb-4">{locationError}</p>
      )}
      <div className="grid sm:grid-cols-1 grid-cols-2 gap-6 mb-6">
        <WeatherWidget weather={weather} />
        <DailySummary tasks={tasks} />
      </div>
      <div className="w-full p-4 bg-white shadow-md rounded">
        <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
        <div className="text-gray-800 font-medium text-base">
          {aiInsights ? (
            <Typewriter text={aiInsights} />
          ) : (
            "Loading AI insights..."
          )}
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
