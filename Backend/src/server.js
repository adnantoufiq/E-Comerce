require("dotenv").config({
  path: `${__dirname}/.env`,
});

const express = require("express");
const { app } = require("./libs/app");
const { connectDB } = require("./libs/config/db");
const { appPort } = require("./secret");
const server = express();

// Here we used those files that are imported before

server.use(express.json()); // for getting json data
server.use(express.urlencoded({ extended: true })); //  for getting form data

server.use(app);

// const APP_PORT = process.env.APP_PORT;
server.listen(appPort, async () => {
  console.log(`The app is listening at http://localhost:${appPort}`);
  await connectDB();
});
