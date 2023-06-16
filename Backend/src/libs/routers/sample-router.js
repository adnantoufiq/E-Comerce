const express = require("express");
const { sampleUser } = require("../controllers/sample-controller");

const sampleRouter = express.Router();

sampleRouter.get("/", sampleUser);

sampleRouter.get("/", sampleUser);
sampleRouter.get("/", sampleUser);
sampleRouter.get("/", sampleUser);


module.exports = { sampleRouter }
