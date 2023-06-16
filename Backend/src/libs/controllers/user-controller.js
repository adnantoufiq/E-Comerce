const createHttpError = require("http-errors");
const User = require("../models/user-model");

const getUser = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;

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
      throw createHttpError(404, "user-not-found");
    }
    res.status(200).send({
      status: "success",
      message: "user get successfully",
      users,
      pagination: {
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
};
