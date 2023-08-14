const { promisify } = require("util");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { getAllJSDocTagsOfKind } = require("typescript");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  //checking if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect emial or password", 401));
  }
  //If everythimg is OK, send the token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Getting token from client and checking if it exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not loggen in. Please log in to get access", 401)
    );
  }

  //verification of the token
  //promisifying the verify function(using util library)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //checking if the user still exists(token exists but user is deleted)s
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401)
    );
  }

  //checking if the user has changed the password after token was created
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User recently changed password, please login getAllJSDocTagsOfKind",
        401
      )
    );
  }
  //if everything's fine, granting access to the protected route
  req.user = freshUser;
  next();
});
