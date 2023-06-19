const createHttpError = require("http-errors");
const User = require("../models/user-model");
const { successResponse } = require("./response-controllers");
const { findItemById } = require("../../services/findItem");
const fs = require("fs");
const { Model } = require("mongoose");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    // it means at least middle name should be same
    const searchUsingRegExp = new RegExp(".*" + search + ".*", "i"); // 'i' => it means search options should be case insensitive

    const searchFilter = {
      isAdmin: { $ne: true },
      $or: [
        {
          name: { $regex: searchUsingRegExp },
        },
        {
          email: { $regex: searchUsingRegExp },
        },
        {
          phone: { $regex: searchUsingRegExp },
        },
      ],
    };

    const optionsForSearch = { password: 0 };
    const users = await User.find(searchFilter, optionsForSearch);
    const count = await User.find(searchFilter).countDocuments();

    if (!users) {
      throw createHttpError(404, "users-not-found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "users-get-successfully",
      payload: {
        users,
        pagination: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log(userID)
    const options = { password: 0 };
    const user = await findItemById(User, id, options);

    return successResponse(res, {
      statusCode: 200,
      message: "user-get-successfully",
      payload: { user },
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log(userID)
    const options = { password: 0 };
    const user = await findItemById(User, id, options);
    const userImagePath = user.image;
    fs.access(userImagePath, (err) => {
      if (err) {
        console.log("userImage-is-not-found");
      } else {
        fs.unlink(userImagePath, (err) => {
          if (err) {
            throw err;
          }
          console.log("userImage-was-deleted-successfully");
        });
      }
    });

    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "user-deleted-successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
};
