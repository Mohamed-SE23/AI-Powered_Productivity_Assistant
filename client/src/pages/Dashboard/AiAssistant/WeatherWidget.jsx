import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { WiDaySunny, WiCloud, WiCloudy, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

const WeatherWidget = ({ weather }) => {
  // Select the appropriate icon based on the weather condition
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear sky":
        return <WiDaySunny className="text-yellow-500 w-12 h-12" />;
      case "scattered clouds":
      case "few clouds":
        return <WiCloud className="text-gray-500 w-12 h-12" />;
      case "broken clouds":
      case "overcast clouds":
        return <WiCloudy className="text-gray-700 w-12 h-12" />;
      case "rain":
      case "shower rain":
        return <WiRain className="text-blue-500 w-12 h-12" />;
      case "thunderstorm":
        return <WiThunderstorm className="text-purple-600 w-12 h-12" />;
      case "snow":
        return <WiSnow className="text-blue-300 w-12 h-12" />;
      default:
        return <WiCloud className="text-gray-500 w-12 h-12" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Weather</h2>
      {weather ? (
        <div className="flex flex-col items-center">
          {/* Location */}
          <div className="flex items-center space-x-2 mb-4">
            <FaMapMarkerAlt className="text-red-500 w-6 h-6 sm:w-4 sm:h-4" />
            <p className="text-lg font-medium">{weather.location}</p>
          </div>
          {/* Temperature */}
          <div className="text-4xl font-bold text-blue-600 mb-4 sm:text-2xl">
            {weather.temperature}°C
          </div>
          {/* Weather Condition Icon */}
          <div>{getWeatherIcon(weather.condition)}</div>
          {/* Weather Condition Text */}
          <p className="text-lg font-medium mt-2 capitalize">
            {weather.condition}
          </p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
