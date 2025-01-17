"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchWeather = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fetchWeather = async params => {
  try {
    if (!process.env.WEATHER_API_KEY) {
      throw new Error("Weather API key is missing.");
    }
    if (!params.lat || !params.lon) {
      throw new Error("Latitude and Longitude are required.");
    }
    const response = await _axios.default.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat: params.lat,
        lon: params.lon,
        appid: process.env.WEATHER_API_KEY,
        units: "metric"
      }
    });
    return {
      location: response.data.name,
      temperature: response.data.main.temp,
      condition: response.data.weather[0].description
    };
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data || error.message);
    throw new Error("Failed to fetch weather data.");
  }
};
exports.fetchWeather = fetchWeather;