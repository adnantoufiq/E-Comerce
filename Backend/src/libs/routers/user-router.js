const express = require("express");
const { getUser, getUsers, deleteUser, registerUser } = require("../controllers/user-controller");

const userRoute = express.Router();


userRoute.post("/register-user", registerUser);


userRoute.post("/get-user", getUsers);

userRoute.post("/get-user/:id", getUser);

userRoute.post("/delete-user/:id", deleteUser);



module.exports = {
  userRoute,
};
