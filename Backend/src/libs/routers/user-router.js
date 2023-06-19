const express = require("express");
const { getUser, getUsers, deleteUser } = require("../controllers/user-controller");

const userRoute = express.Router();

userRoute.post("/get-user", getUsers);

userRoute.post("/get-user/:id", getUser);

userRoute.post("/delete-user/:id", deleteUser);



module.exports = {
  userRoute,
};
