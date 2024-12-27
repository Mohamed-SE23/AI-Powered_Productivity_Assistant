import { fetchWeather } from "../../services/weatherService.js";

export const getWeather = async (req, res) => {
  const weatherData = await fetchWeather(req.query);
  res.json(weatherData);
};
