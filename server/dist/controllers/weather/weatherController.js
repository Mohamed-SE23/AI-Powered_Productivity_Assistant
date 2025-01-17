"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeather = void 0;
var _weatherService = require("../../services/weatherService.js");
const getWeather = async (req, res) => {
  const weatherData = await (0, _weatherService.fetchWeather)(req.query);
  res.json(weatherData);
};
exports.getWeather = getWeather;