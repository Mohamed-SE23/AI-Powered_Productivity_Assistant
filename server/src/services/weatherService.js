import axios from "axios";

export const fetchWeather = async (params) => {
  try {
    if (!process.env.WEATHER_API_KEY) {
      throw new Error("Weather API key is missing.");
    }

    let lat, lon;

    if (params.lat && params.lon) {
      lat = params.lat;
      lon = params.lon;
    } else if (params.location) {
      // Convert the location name to coordinates.
      // For example, you can use a geocoding API or a static mapping.
      // Here’s a simple static example for "Khartoum":
      if (params.location.toLowerCase() === "khartoum") {
        lat = 15.5007;
        lon = 32.5599;
      } else {
        throw new Error("Unable to determine coordinates from location.");
      }
    } else {
      throw new Error("Latitude and Longitude are required.");
    }

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
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
