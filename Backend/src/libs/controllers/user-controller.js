const createHttpError = require("http-errors");
const User = require("../models/user-model");
const { successResponse } = require("./response-controllers");
const { findItemById } = require("../../services/findItem");
const { Model } = require("mongoose");
const { deleteImage } = require("../../helper/image-delete");
const { createJsonWebToken } = require("../../helper/jsonWebToken");
const { frontEndUrl } = require("../../secret");
const { sendEmailWithNodeMailer } = require("../../helper/email-modified");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, address } = req.body;
    // console.log({email})

    const userExist = await User.exists({ email: email });
    if (userExist) {
      throw createHttpError(
        409,
        "user-already-exist-with-this-mail, try-to-sign-in"
      );
    }

    const token = createJsonWebToken(
      { name, email, phone, password, address },
      process.env.SECRET_KEY,
      "10m"
    );
    // console.log(token);

    const emailDataSet = {
      email,
      subject: "Account Activation Email ",
      html: `
        <h2> hello ${name} ! </h2>
        <p>Please click here to <a href= "${frontEndUrl}/users/active/${token}"> Active Your Account </a></p>

      `,
    };

    try {
      await sendEmailWithNodeMailer(emailDataSet);
    } catch (error) {
      throw createHttpError(500, "verification-email-send-problem");
    }

    return successResponse(res, {
      statusCode: 200,
      message: `check-your-${email}-for-verification`,
      payload: { token },
    });
  } catch (err) {
    next(err);
  }
};

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
    deleteImage(userImagePath);

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
  registerUser,
  getUsers,
  getUser,
  deleteUser,
};
