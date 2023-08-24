const Users = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
    // console.log(newObj);
  });
  return newObj;
};

exports.getDetails = catchAsync(async (req, res) => {
  const user = await Users.findById(req.user.id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(400, {
        misc: {
          name: 'WRONG ROUTE',
          message: "This route is not for password update. Please use updatePassword route"
        }
      }
      )
    );
  }
  //Filtering out unwanted fields that we dont want user to update
  const filteredBody = filterObj(req.body, "name", "email");
  //we can use findByIdAndUpdate as we are dealing with non sensitive data
  const updatedUser = await Users.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  //console.log(updatedUser);
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getEmployees = catchAsync(async (req, res, next) => {
  const users = await Users.find().where("location").in(req.params.locations);

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
