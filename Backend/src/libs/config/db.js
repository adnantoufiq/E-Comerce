const mongoose = require("mongoose");

const DB_PORT =
  process.env.MONGO_DB_ATLAS_URL || "mongodb://localhost:27017/ecommerceMERN";

const connectDB = async () => {
  try {
    mongoose
      .connect(DB_PORT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("connection successFull"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("connection failed");
  }
};

module.exports = {
  connectDB,
};
