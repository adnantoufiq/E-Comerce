const { data } = require("../../data");
const User = require("../models/user-model");

const sampleUser = async (req, res, next) => {

  try {
    await User.deleteMany({});
    const users = await User.insertMany(data.users);

    res.status(200).send({
      status: "success",
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
 sampleUser,
};
