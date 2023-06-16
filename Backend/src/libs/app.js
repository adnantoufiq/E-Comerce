const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const { userRoute } = require("./routers/user-router");
const { sampleRouter } = require("./routers/sample-router");

const app = express.Router();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 5 minutes)
  message: "too many request. please try again later ",
});

app.use(morgan("dev")); // request type, request route, status code, time
app.use(xssClean()); // to sanitize user input coming from POST body, GET queries, and url params
app.use(limiter);

app.use("/user", userRoute);

app.use("/user/sample-user", sampleRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "welcome to the server",
  });
});

app.get("/get-products", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Products get successfully",
  });
});

app.post("/insert-products", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Products inserted successfully",
  });
});

app.put("/update-products", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Products updated successfully",
  });
});

app.delete("/delete-products", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Products deleted successfully",
  });
});

//  for client error
app.use((req, res, next) => {
  next(createError(404, "url not found"));
});

// for server error
app.use((err, req, res, next) => {
  return res.status(err.status || 500).send({
    status: "failed",
    message: err.message,
  });
});

module.exports = {
  app,
};
