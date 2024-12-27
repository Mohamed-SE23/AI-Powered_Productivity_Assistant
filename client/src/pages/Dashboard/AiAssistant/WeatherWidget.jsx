import React from "react";

const WeatherWidget = ({ weather }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Weather</h2>
      {weather ? (
        <div>
          <p>Location: {weather.location}</p>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
