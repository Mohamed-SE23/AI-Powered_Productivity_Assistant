import axios from "axios";

export const fetchWeather = async (params) => {
  try {
    if (!process.env.WEATHER_API_KEY) {
      throw new Error("Weather API key is missing.");
    }

    if (!params.lat || !params.lon) {
      throw new Error("Latitude and Longitude are required.");
    }
    
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat: params.lat,
        lon: params.lon,
        appid: process.env.WEATHER_API_KEY,
        units: "metric",
      },
    });

    return {
      location: response.data.name,
      temperature: response.data.main.temp,
      condition: response.data.weather[0].description,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data || error.message);
    throw new Error("Failed to fetch weather data.");
  }
};
