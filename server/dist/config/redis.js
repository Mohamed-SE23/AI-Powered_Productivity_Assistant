"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _redis = require("redis");
const redisClient = (0, _redis.createClient)({
  url: process.env.REDIS_URL
});
var _default = exports.default = redisClient;