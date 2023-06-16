const express = require("express");
const { getUser } = require("../controllers/user-controller");

const userRoute = express.Router();

userRoute.get("/", getUser);

module.exports = {
  userRoute,
};
