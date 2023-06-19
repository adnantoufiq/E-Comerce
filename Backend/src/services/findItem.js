const createHttpError = require("http-errors");
const { mongoose, } = require("mongoose");

const findItemById = async (Model, id, options ={}) => {
  try {
    // console.log(options)
    const userID = id;


    const item = await Model.findById(userID, options);
    // console.log(user)

    if (!item) {
      throw createHttpError(404, `${Model.modelName}Item-not-found`);
    }

    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createHttpError(400, "Invalid-ID-for-mongoose");
    }
    throw error;
  }
};

module.exports = {
  findItemById,
};
